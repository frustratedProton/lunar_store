import { PrismaClient } from '@prisma/client';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
    try {
        const { file } = req;
        const folderId = parseInt(req.body.folderId);
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        if (!file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        const newFile = await prisma.file.create({
            data: {
                name: file.originalname,
                size: file.size,
                url: file.path,
                userId: req.user.id,
                folderId: folderId || null,
            },
        });

        res.status(201).json(newFile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error uploading file' });
    }
};

export const getFileDetails = async (req, res) => {
    const fileId = parseInt(req.params.id);

    try {
        const file = await prisma.file.findUnique({
            where: { id: fileId },
            include: {
                user: true,
            },
        });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const fileDetails = {
            name: file.name,
            size: file.size,
            uploadTime: file.uploadTime,
            owner: {
                username: file.user.username,
            },
            url: file.url,
        };

        return res.json({
            fileDetails,
            downloadLink: `/files/download/${fileId}`,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const downloadFile = async (req, res) => {
    const fileId = parseInt(req.params.id);

    try {
        const file = await prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const storedFileName = file.url;
        const filePath = path.join(__dirname, '..', storedFileName);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found on server' });
        }

        res.download(filePath, file.name, (err) => {
            if (err) {
                return res.status(500).json({ error: 'File download failed' });
            }
        });
    } catch (error) {
        console.error(error);
    }
};

export const getAllFiles = async (req, res) => {
    try {
        const files = await prisma.file.findMany({
            where: {
                userId: req.user.id,
            },
        });

        return res.json({ files });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch files' });
    }
};

/**
 * Update a folder
 */
export const updateFile = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const file = await prisma.file.findUnique({
            where: { id: parseInt(id) },
        });

        if (!file || file.userId !== userId) {
            return res
                .status(404)
                .json({ error: 'Folder not found or unauthorized' });
        }

        const updatedFile = await prisma.file.update({
            where: { id: parseInt(id) },
            data: { name },
        });

        res.status(200).json(updatedFile);
    } catch (error) {
        console.error('Error updating folder:', error);
        res.status(500).json({ error: 'Failed to update folder' });
    }
};

/**
 * Delete a file
 */

export const deleteFile = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const file = await prisma.file.findUnique({
            where: { id: parseInt(id) },
        });

        if (!file || file.userId !== userId) {
            return res
                .status(404)
                .json({ error: 'File not found or unauthorized' });
        }

        const filePath = path.join(__dirname, '..', file.url);

        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        await prisma.file.delete({ where: { id: parseInt(id) } });

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
};
