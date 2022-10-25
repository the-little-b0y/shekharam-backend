import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { getUser, postUser, putUser } from '../controller/userController';
import { validateRequest } from '../utils/requestValidator';
import { postUserValidator, putUserValidator } from '../validator/userValidator';

export const router = Router();

router.post('/', postUserValidator, validateRequest, postUser);
router.get('/', isauthorized, getUser);
router.put('/', isauthorized, putUserValidator, validateRequest, putUser);
