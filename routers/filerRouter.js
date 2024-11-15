import {
    downloadFile,
    getFileDetails,
    uploadFile,
} from '../controllers/fileController.js';
import { Router } from 'express';
import upload from '../middleware/multer.js';

const fileRouter = Router();

fileRouter.post('/upload', upload.single('file'), uploadFile);
fileRouter.get('/:id', getFileDetails);
fileRouter.get('/download/:id', downloadFile);

export default fileRouter;
