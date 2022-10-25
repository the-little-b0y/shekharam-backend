import { body, ValidationChain } from 'express-validator';
import { personNameRegex } from '../constants/regex';

export const postUserValidator: ValidationChain[] = [
    body('mobileNumber', 'Mobile Number is not present').exists(),
    body('mobileNumber', 'Mobile Number is not valid').isMobilePhone('any'),
    body('password', 'Password is not present').exists(),
    body('password', 'Password is not strong enough. Password should contain minimum 8 characters, with atleast a lowercase, an uppercase, a number and a symbol').isStrongPassword({
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    })
]

export const putUserValidator: ValidationChain[] = [
    body('firstName', 'First Name is not present').exists(),
    body('firstName', 'First Name should contain minimum 2 characters').isLength({min: 2}),
    body('firstName', 'First Name is not valid').matches(personNameRegex),
    body('lastName', 'Last Name is not present').exists(),
    body('lastName', 'Last Name should contain minimum 2 characters').isLength({min: 2}),
    body('lastName', 'Last Name is not valid').matches(personNameRegex),
    body('dateOfBirth', 'Date Of Birth is not present').exists()
]
