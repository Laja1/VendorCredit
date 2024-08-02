import { User, Loan, LoanTerm } from './model';
import { type Request, type Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

async function handleSignUp(req: Request, res: Response) {
  try {
    const { firstname, lastname, email, password } = req.body;
   
    if(!firstname || !lastname ||!email || !password) {
     
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstname, lastname, email, password: hashedPassword });
    await user.save();

    return res.status(201).json({ message: "User created successfully", userId: user._id });
  } catch (error: any) {
    return res.status(500).json({ message: `Error: ${error.message}` });
  }
}

async function handleSignIn(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if(!email || !password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, { expiresIn: "15m" });
    const refreshToken = jwt.sign({ userId: user._id }, process.env.REFRESH_SECRET!, { expiresIn: "7d" });

    user.accessToken = accessToken;
    user.refreshToken = refreshToken;
    await user.save();

    return res.status(200).json({ accessToken, refreshToken });
  } catch (error: any) {
    return res.status(500).json({ message: `Error during signin: ${error.message}` });
  }
}
async function requestForLoan(req: Request, res: Response) {
  try {
    const { loanAmount, loanPurpose, loanTerm } = req.body;

    if (!loanAmount || !loanPurpose || !loanTerm) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userId = (req as any).user.userId;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

   
    const loanTermString = String(loanTerm).toUpperCase();

    const loan = new Loan({
      loanAmount,
      loanPurpose,
      loanTerm: loanTermString, // Process loanTerm as a string
      user: userId,
    });

    await loan.save();
    user.loans.push(loan.id);
    await user.save();

    return res.status(201).json({ message: "Loan request submitted successfully", loanId: loan._id });
  } catch (error: any) {
    return res.status(500).json({ message: `Error requesting loan: ${error.message}` });
  }
}

async function getAllLoans(req: Request, res: Response) {
  try {
    const userId = (req as any).user.userId;
    const user = await User.findById(userId).populate('loans');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user.loans);
  } catch (error: any) {
    return res.status(500).json({ message: `Error fetching loans: ${error.message}` });
  }
}

async function healthCheck(req: Request, res: Response) {
  return res.status(200).json({ status: "OK" });
}

export {
    healthCheck,
    handleSignIn,
    handleSignUp,
    requestForLoan,
    getAllLoans
}