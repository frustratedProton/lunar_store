import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../config/supabase.js';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
    const { file } = req;
    const folderId = parseInt(req.body.folderId);

    if (!file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    const filePath = `uploads/${req.user.id}/${Date.now()}-${
        file.originalname
    }`;

    try {
        const { data, error } = await supabase.storage
            .from('uploads')
            .upload(filePath, file.buffer, { contentType: file.mimetype });

        if (error) {
            return res
                .status(500)
                .json({ message: 'Error uploading file to Supabase', error });
        }

        const fileUrl = `${process.env.SUPABASE_PROJECT_URL}/public/${data.path}`;

        const newFile = await prisma.file.create({
            data: {
                name: file.originalname,
                size: file.size,
                filePath: data.path,
                userId: req.user.id,
                folderId: folderId || null,
            },
        });
        return res
            .status(201)
            .json({ message: 'File uploaded successfully', file: newFile });
    } catch (err) {
        console.error(err);
        return res
            .status(500)
            .json({ message: 'Error uploading file', error: err.message });
    }
};

export const getSignedUrl = async (req, res) => {
    const fileId = parseInt(req.params.id);

    try {
        const file = await prisma.file.findUnique({
            where: { id: fileId },
        });

        if (!file) {
            return res.status(404).json({ error: 'File not found' });
        }

        const { data, error } = await supabase.storage
            .from('uploads')
            .createSignedUrl(file.filePath, 3600);

        if (error) {
            return res.status(500).json({ error: error.message });
        }

        return res.json({ signedUrl: data.signedUrl });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
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

        // const filePath = path.join(__dirname, '..', file.url);

        // if (fs.existsSync(filePath)) {
        //     fs.unlinkSync(filePath);
        // }

        const filePath = file.url;
        const { data, error } = await supabase.storage
            .from('uploads')
            .remove([filePath]);

        await prisma.file.delete({ where: { id: parseInt(id) } });

        res.status(200).json({ message: 'File deleted successfully' });
    } catch (error) {
        console.error('Error deleting file:', error);
        res.status(500).json({ error: 'Failed to delete file' });
    }
};
