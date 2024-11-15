import { Router } from 'express';
import {
    createFolder,
    deleteFolder,
    getFolder,
    updateFolder,
} from '../controllers/folderController.js';

const folderRouter = Router();

folderRouter.post('/', createFolder);
folderRouter.get('/', getFolder);
folderRouter.put('/:id', updateFolder);
folderRouter.delete(':/id', deleteFolder);

export default folderRouter;
