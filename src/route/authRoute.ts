import { Router } from 'express';
import { jwtRefreshtoken, passportAuthenticate } from '../controller/authController';
import { validateRequest } from '../utils/requestValidator';
import { loginValidator, refreshTokenValidator } from '../validator/authValidator';

export const router = Router();

router.post('/', loginValidator, validateRequest, passportAuthenticate);
router.post('/refreshtoken', refreshTokenValidator, validateRequest, jwtRefreshtoken);
