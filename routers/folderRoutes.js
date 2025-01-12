import { Router } from 'express';
import upload from '../middleware/multer.js';
import {
    createFolder,
    getAllFolders,
    getFolderDetails,
    uploadFileToFolder,
    updateFolder,
    deleteFolder,
} from '../controllers/folderController.js';

const folderRouter = Router();

folderRouter.post('/', createFolder);
folderRouter.get('/', getAllFolders);
folderRouter.get('/:id', getFolderDetails);
folderRouter.put('/:id', updateFolder);
folderRouter.delete('/:id', deleteFolder);

folderRouter.post('/:id/upload', upload.single('file'), uploadFileToFolder);

export default folderRouter;
