import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

/**
 * Create a new folder
 */
export const createFolder = async (req, res) => {
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.create({
            data: {
                name,
                userId,
            },
        });
        res.status(201).json(folder);
    } catch (error) {
        console.error('Error creating folder:', error);
        res.status(500).json({ error: 'Error creating folder' });
    }
};

/**
 * Get all folders for the logged-in user
 */
export const getAllFolders = async (req, res) => {
    const userId = req.user.id;

    try {
        const folders = await prisma.folder.findMany({
            where: { userId },
        });
        res.status(200).json({ folders });
    } catch (error) {
        console.error('Error fetching folders:', error);
        res.status(500).json({ error: 'Failed to load folders' });
    }
};

/**
 * Get details of a specific folder, including its files
 */
export const getFolderDetails = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.findUnique({
            where: { id: parseInt(id) },
            include: { files: true },
        });

        if (!folder || folder.userId !== userId) {
            return res.status(404).json({ error: 'Folder not found' });
        }

        res.status(200).json({ folder, files: folder.files });
    } catch (error) {
        console.error('Error fetching folder details:', error);
        res.status(500).json({ error: 'Failed to load folder details' });
    }
};

/**
 * Upload a file to a folder
 */
export const uploadFileToFolder = async (req, res) => {
    const { folderId } = req.params;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.findUnique({
            where: { id: parseInt(folderId) },
        });

        if (!folder || folder.userId !== userId) {
            return res
                .status(404)
                .json({ error: 'Folder not found or unauthorized' });
        }

        const file = await prisma.file.create({
            data: {
                name: req.file.filename,
                size: req.file.size,
                folderId: parseInt(folderId),
                userId,
            },
        });

        res.status(201).json({ file });
    } catch (error) {
        console.error('Error uploading file:', error);
        res.status(500).json({ error: 'Failed to upload file' });
    }
};

/**
 * Update a folder
 */
export const updateFolder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.findUnique({
            where: { id: parseInt(id) },
        });

        if (!folder || folder.userId !== userId) {
            return res
                .status(404)
                .json({ error: 'Folder not found or unauthorized' });
        }

        const updatedFolder = await prisma.folder.update({
            where: { id: parseInt(id) },
            data: { name },
        });

        res.status(200).json(updatedFolder);
    } catch (error) {
        console.error('Error updating folder:', error);
        res.status(500).json({ error: 'Failed to update folder' });
    }
};

/**
 * Delete a folder
 */
export const deleteFolder = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.findUnique({
            where: { id: parseInt(id) },
        });

        if (!folder || folder.userId !== userId) {
            return res
                .status(404)
                .json({ error: 'Folder not found or unauthorized' });
        }

        await prisma.folder.delete({ where: { id: parseInt(id) } });
        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.error('Error deleting folder:', error);
        res.status(500).json({ error: 'Failed to delete folder' });
    }
};
