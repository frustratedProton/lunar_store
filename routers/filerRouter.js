import { uploadFile } from '../controllers/fileController.js';
import { Router } from 'express';
import upload from '../middleware/multer.js';

const fileRouter = Router();

fileRouter.post('/upload', upload.single('file'), uploadFile);

export default fileRouter;
