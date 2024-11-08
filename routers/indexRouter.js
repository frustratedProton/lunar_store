import { Router } from 'express';
import authRouter from './authRouter.js';
import fileRouter from './filerRouter.js';
import folderRouter from './folderRoutes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/files', fileRouter);
router.use('/folder', folderRouter);

export default router;
