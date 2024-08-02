import { object } from "yup";
import { defaultValidation, emailValidation, passwordValidation } from ".";

export const LoginSchema = object().shape({
   
    email:emailValidation(),
    password:passwordValidation()
})

export const registerSchema = object().shape({
     lastname: defaultValidation('Last Name'),
     firstname: defaultValidation('First Name'),
    email:emailValidation(),
    password:passwordValidation()
})