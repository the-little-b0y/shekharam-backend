import { body, ValidationChain } from 'express-validator';

export const postUserValidator: ValidationChain[] = [
    body('mobileNumber', 'Mobile Number is not present').exists(),
    body('mobileNumber', 'Mobile Number is not valid').isMobilePhone('any'),
    body('password', 'Password is not present').exists(),
    body('password', 'Password is not strong enough. Password should have 8 characters, with atleast a lowercase, an uppercase, a number and a symbol').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
]
