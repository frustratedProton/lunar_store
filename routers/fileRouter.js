import {
    downloadFile,
    getAllFiles,
    getFileDetails,
    uploadFile,
} from '../controllers/fileController.js';
import { Router } from 'express';
import upload from '../middleware/multer.js';

const fileRouter = Router();

fileRouter.post('/upload', upload.single('file'), uploadFile);
fileRouter.get('/all', getAllFiles);
fileRouter.get('/download/:id', downloadFile);
fileRouter.get('/:id', getFileDetails);

export default fileRouter;
