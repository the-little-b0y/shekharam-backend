import { Router } from 'express';
import { passportAuthenticate } from '../controller/authController';
import { validateRequest } from '../utils/requestValidator';
import { loginValidator } from '../validator/authValidator';

export const router = Router();

router.post('/', loginValidator, validateRequest, passportAuthenticate);
