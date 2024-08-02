
import mongoose, { Document, Schema, Types } from 'mongoose';

enum LoanTerm {
    MONTH = 'MONTH',
    YEAR = 'YEAR'
}

interface IUser extends Document {
  firstname:string;
  lastname:string;
  email: string;
  password: string;
  refreshToken?: string;
  accessToken?: string;
  loans: Types.ObjectId[] | ILoan[];
}

interface ILoan extends Document {
    loanAmount: number;
    loanPurpose: string;
    loanTerm: LoanTerm;
    user: Types.ObjectId | IUser;
}

const UserSchema: Schema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  refreshToken: { type: String },
  accessToken: { type: String },
  loans: [{ type: Schema.Types.ObjectId, ref: 'Loan' }]
});


const LoanSchema: Schema = new Schema({
  loanAmount: { type: Number, required: true },
  loanPurpose: { type: String, required: true },
  loanTerm: { type: Number,  required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const User = mongoose.model<IUser>('User', UserSchema);
const Loan = mongoose.model<ILoan>('Loan', LoanSchema);

export { User, Loan, LoanTerm };