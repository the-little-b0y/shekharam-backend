import { Router } from 'express';
import { router as userRoute } from '../route/userRoute';

export const router = Router();

router.use('/user', userRoute);
