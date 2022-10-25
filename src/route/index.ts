import { Router } from 'express';
import { router as userRoute } from '../route/userRoute';
import { router as authRoute } from '../route/authRoute';

export const router = Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);
