import {string} from 'yup'

export const defaultValidation = (name:string)=> string().required(`${name} is required`)

export const emailValidation = () => string().email('Invalid email address').required('Email address is required')

export const passwordValidation  = () => string()
        .required('Password is required')
        .min(8, 'Password must be at least 8 characters')
        .matches(
            /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
        )