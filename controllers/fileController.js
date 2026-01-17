import { PrismaClient } from '@prisma/client';
import path from 'path';
import { fileURLToPath } from 'url';
import supabase from '../config/supabase.js';

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFile = async (req, res) => {
	const { file } = req;
	const folderId = req.body.folderId ? parseInt(req.body.folderId) : null;

	if (!file) {
		return res.status(400).json({ message: 'No file uploaded' });
	}

	const filePath = `uploads/${req.user.id}/${Date.now()}-${file.originalname}`;

	try {
		const { data, error } = await supabase.storage
			.from('uploads')
			.upload(filePath, file.buffer, { contentType: file.mimetype });

		if (error) {
			return res
				.status(500)
				.json({ message: 'Error uploading file to Supabase', error });
		}

		const newFile = await prisma.file.create({
			data: {
				name: file.originalname,
				size: file.size,
				filePath: data.path,
				userId: req.user.id,
				folderId: folderId,
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
	const userId = req.user.id; 

	try {
		const file = await prisma.file.findFirst({
			where: {
				id: fileId,
				userId: userId,
			},
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
	const userId = req.user.id; 

	try {
		const file = await prisma.file.findFirst({
			where: {
				id: fileId,
				userId: userId,
			},
			include: {
				user: {
					select: { username: true }, 
				},
			},
		});

		if (!file) {
			return res.status(404).json({ error: 'File not found' });
		}

		const fileDetails = {
			name: file.name,
			size: file.size,
			uploadTime: file.uploadTime || file.createdAt, 
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
				.json({ error: 'File not found or unauthorized' });
		}

		const updatedFile = await prisma.file.update({
			where: { id: parseInt(id) },
			data: { name },
		});

		res.status(200).json(updatedFile);
	} catch (error) {
		console.error('Error updating file:', error);
		res.status(500).json({ error: 'Failed to update file' });
	}
};

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

		const { error } = await supabase.storage
			.from('uploads')
			.remove([file.filePath]);

		if (error) {
			console.error('Supabase deletion error:', error);
		}

		await prisma.file.delete({ where: { id: parseInt(id) } });

		res.status(200).json({ message: 'File deleted successfully' });
	} catch (error) {
		console.error('Error deleting file:', error);
		res.status(500).json({ error: 'Failed to delete file' });
	}
};
