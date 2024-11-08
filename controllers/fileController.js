import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const uploadFile = async (req, res) => {
    try {
        const { file } = req;
        const { folderId } = req.body;

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
