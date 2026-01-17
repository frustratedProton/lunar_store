import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faFileAlt,
	faPen,
	faSyncAlt,
	faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { Heading2 } from '../styles/Headings.styles';
import {
	FolderDetailsContainer,
	FolderTitle,
	FolderActions,
	FolderInput,
	FileList,
	FileListItem,
	NoFilesMessage,
	InlineFlexWrapper,
	FileLink,
	FileColumn,
} from '../styles/FolderDetails.styles';

import {
	ErrorText,
	ModalContent,
	ModalOverlay,
	UploadButton,
	ButtonContainer,
	CancelButton,
} from '../styles/UploadFile.styles';
import api from '../../api';

const FolderDetails = () => {
	const { folderId } = useParams();
	const navigate = useNavigate();
	const [folder, setFolder] = useState(null);
	const [files, setFiles] = useState([]);
	const [newName, setNewName] = useState('');
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isEditing, setIsEditing] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);

	useEffect(() => {
		const fetchFolderDetails = async () => {
			try {
				// const response = await axios.get(
				//     `http://localhost:3000/folder/${folderId}`,
				//     { withCredentials: true }
				// );

				const response = await api.get(`/folder/${folderId}`);

				setFolder(response.data.folder);
				setFiles(response.data.folder.files || []);
			} catch (err) {
				setError('Failed to fetch folder details.');
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchFolderDetails();
	}, [folderId]);

	const handleUpdateFolder = async () => {
		if (!newName.trim()) {
			alert('Please enter a new name for the folder.');
			return;
		}

		try {
			// const response = await axios.put(
			//     `http://localhost:3000/folder/${folderId}`,
			//     { name: newName },
			//     { withCredentials: true }
			// );

			const response = await api.put(`/folder/${folderId}`, {
				name: newName,
			});

			setFolder(response.data);
			setNewName('');
			setIsEditing(false);
		} catch (err) {
			setError('Error updating folder.');
			console.error(err);
		}
	};

	const handleDeleteFolder = async () => {
		try {
			await axios.delete(`http://localhost:3000/folder/${folderId}`, {
				withCredentials: true,
			});

			navigate('/folders');
		} catch (err) {
			setError('Error deleting folder.');
			console.error(err);
		}
	};

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	if (loading) return <p>Loading folder details...</p>;
	if (error) return <p>{error}</p>;
	if (!folder) return <p>Folder not found.</p>;

	return (
		<FolderDetailsContainer>
			<FolderTitle>{folder.name}</FolderTitle>

			<InlineFlexWrapper>
				<UploadButton onClick={() => setIsEditing((prev) => !prev)}>
					<FontAwesomeIcon icon={faPen} />
					{isEditing ? 'Cancel Edit' : 'Edit Folder'}
				</UploadButton>

				{isEditing && (
					<FolderActions>
						<FolderInput
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							placeholder="New folder name"
						/>
						<UploadButton
							onClick={handleUpdateFolder}
							disabled={!newName.trim()}
						>
							<FontAwesomeIcon icon={faSyncAlt} />
							Update Folder
						</UploadButton>
						<CancelButton onClick={openModal}>
							<FontAwesomeIcon icon={faTrash} />
							Delete Folder
						</CancelButton>
					</FolderActions>
				)}
			</InlineFlexWrapper>

			<Heading2>Files</Heading2>
			<FileList>
				{files.length > 0 ? (
					files.map((file) => (
						<FileListItem key={file.id}>
							<FileLink to={`/files/${file.id}`}>
								<FontAwesomeIcon icon={faFileAlt} />
								<FileColumn>{file.name}</FileColumn>
							</FileLink>
						</FileListItem>
					))
				) : (
					<NoFilesMessage>No files in this folder.</NoFilesMessage>
				)}
			</FileList>

			{isModalOpen && (
				<ModalOverlay>
					<ModalContent>
						<Heading2>
							Are you sure you want to delete this folder?
						</Heading2>
						<ButtonContainer>
							<UploadButton onClick={handleDeleteFolder}>
								Yes, Delete
							</UploadButton>
							<CancelButton onClick={closeModal}>
								Cancel
							</CancelButton>
						</ButtonContainer>

						{error && <ErrorText>{error}</ErrorText>}
					</ModalContent>
				</ModalOverlay>
			)}
		</FolderDetailsContainer>
	);
};

export default FolderDetails;
