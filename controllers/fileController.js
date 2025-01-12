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
        console.log(req.user);
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

        // constructing file path
        const storedFileName = file.url;
        const filePath = path.join(__dirname, '..', storedFileName);

        console.log(filePath, __dirname, __filename);

        // check for file path existence
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
                userId: req.user.id, // assuming you're using user authentication
            },
        });

        return res.json({ files });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to fetch files' });
    }
};
