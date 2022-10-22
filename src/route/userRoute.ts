import { Router } from 'express';
import { postUser } from '../controller/userController';
import { validateRequest } from '../utils/requestValidator';
import { postUserValidator } from '../validator/userValidator';

export const router = Router();

router.post('/', postUserValidator, validateRequest, postUser);
