import { Router } from 'express';
import { isauthorized } from '../controller/authController';
import { getUser, postUser, putAvatar, putPasswordReset, putUser } from '../controller/userController';
import { validateRequest } from '../utils/requestValidator';
import { postUserValidator, putAvatarValidator, putPasswordResetValidator, putUserValidator } from '../validator/userValidator';

export const router = Router();

router.post('/', postUserValidator, validateRequest, postUser);
router.get('/', isauthorized, getUser);
router.put('/', isauthorized, putUserValidator, validateRequest, putUser);
router.put('/avatar', isauthorized, putAvatarValidator, validateRequest, putAvatar);
router.put('/passwordreset', isauthorized, putPasswordResetValidator, validateRequest, putPasswordReset);
