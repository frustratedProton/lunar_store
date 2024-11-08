import express from 'express';
import { signUp, signIn, logOut } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/log-out', logOut);

export default authRouter;
