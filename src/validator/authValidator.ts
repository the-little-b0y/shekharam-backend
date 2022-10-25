import { body, ValidationChain } from 'express-validator';

export const loginValidator: ValidationChain[] = [
    body('mobileNumber', 'Mobile Number is not present').exists(),
    body('password', 'Password is not present').exists()
]
