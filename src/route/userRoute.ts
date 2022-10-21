import { Router } from 'express';
import { postUser } from '../controller/userController';

export const router = Router();

router.post('/', postUser);
