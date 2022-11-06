import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { getUser, postUser, putVa, putPasswordReset, putUser } from '../controller/userController';
import { validateRequest } from '../utils/requestValidator';
import { postUserValidator, putVaValidator, putPasswordResetValidator, putUserValidator } from '../validator/userValidator';

export const router = Router();

router.post('/', postUserValidator, validateRequest, postUser);
router.get('/', isauthorized, getUser);
router.put('/', isauthorized, putUserValidator, validateRequest, putUser);
router.put('/va', isauthorized, putVaValidator, validateRequest, putVa);
router.put('/passwordreset', isauthorized, putPasswordResetValidator, validateRequest, putPasswordReset);
