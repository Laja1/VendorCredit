import * as Yup from 'yup';
import { defaultValidation } from '.'

export const loanSchema = Yup.object().shape({
  loanAmount: Yup.number()
    .typeError('Loan amount must be a number')
    .required('Loan amount is required')
    .min(1000, 'Loan amount must be at least 1000')
    .max(1000000, 'Loan amount cannot exceed 1,000,000'),
  loanPurpose: defaultValidation('Loan purpose'),
  loanTerm: Yup.number()
    .typeError('Loan term must be a number')
    .required('Loan term is required')
    .min(1, 'Loan term must be at least 1 year')
    .max(30, 'Loan term cannot exceed 30 years'),
});