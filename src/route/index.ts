import { Router } from 'express';
import { router as userRoute } from '../route/userRoute';
import { router as authRoute } from '../route/authRoute';
import { router as configurationRoute } from '../route/configurationRoute';

export const router = Router();

router.use('/user', userRoute);
router.use('/auth', authRoute);
router.use('/configuration', configurationRoute);
