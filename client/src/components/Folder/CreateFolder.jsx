/* eslint-disable react/prop-types */
import { useState } from 'react';
import {
	ModalOverlay,
	ModalContent,
	InputField,
	ErrorText,
	UploadButton,
	CancelButton,
	ButtonContainer,
} from '../styles/UploadFile.styles';
import api from '../../api';

const CreateFolderModal = ({ onClose, onFolderCreated }) => {
	const [folderName, setFolderName] = useState('');
	const [error, setError] = useState(null);

	const handleFolderCreation = async () => {
		if (!folderName) {
			setError('Folder name is required.');
			return;
		}

		try {
			const response = await api.post('/folder', { name: folderName });

			onFolderCreated(response.data.folder);
			setFolderName('');
			onClose();
		} catch (error) {
			setError('Error creating folder');
			console.error(error);
		}
	};

	return (
		<ModalOverlay>
			<ModalContent>
				<h2>Create New Folder</h2>

				{/* Error Message */}
				{error && <ErrorText>{error}</ErrorText>}

				{/* Folder Name Input */}
				<InputField
					type="text"
					placeholder="Folder Name"
					value={folderName}
					onChange={(e) => setFolderName(e.target.value)}
				/>

				{/* Buttons in Row */}
				<ButtonContainer>
					<UploadButton onClick={handleFolderCreation}>
						Create Folder
					</UploadButton>
					<CancelButton onClick={onClose}>Close</CancelButton>
				</ButtonContainer>
			</ModalContent>
		</ModalOverlay>
	);
};

export default CreateFolderModal;
