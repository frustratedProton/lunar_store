import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
        console.error(error);
        res.status(500).json({ error: 'Error creating folder' });
    }
};

export const getFolder = async (req, res) => {
    const userId = req.user.id;
    console.log('works', userId)
    try {
        const folders = await prisma.folder.findMany({
            where: { userId },
            include: {
                files: true,
            },
        });
        res.status(200).json(folders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error fetching folders' });
    }
};

export const updateFolder = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.update({
            where: { id: Number(id), userId },
            data: { name },
        });

        res.status(200).json(folder);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating folder' });
    }
};

export const deleteFolder = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.id;

    try {
        const folder = await prisma.folder.delete({
            where: { id: Number(id), userId },
        });

        res.status(200).json({ message: 'Folder deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting folder' });
    }
};
