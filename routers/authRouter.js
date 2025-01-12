import express from 'express';
import {
    signUp,
    signIn,
    logOut,
    checkAuth,
    getUserData,
} from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.post('/sign-up', signUp);
authRouter.post('/sign-in', signIn);
authRouter.post('/log-out', logOut);
authRouter.get('/check-session', checkAuth);
authRouter.get('/me', getUserData);


export default authRouter;
