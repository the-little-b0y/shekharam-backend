import { body, ValidationChain } from 'express-validator';

export const loginValidator: ValidationChain[] = [
    body('mobileNumber', 'Mobile Number is not present').exists(),
    body('password', 'Password is not present').exists()
]

export const refreshTokenValidator: ValidationChain[] = [
    body('refreshtoken', 'Refresh token is not present').exists()
]
