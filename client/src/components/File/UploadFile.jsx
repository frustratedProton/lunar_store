/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import {
	ErrorText,
	ModalContent,
	ModalOverlay,
	UploadButton,
	DropzoneArea,
	FileDetails,
	ButtonContainer,
	CancelButton,
	FolderSelect,
	FolderSelectWrapper,
	FolderSelectLabel,
} from '../styles/UploadFile.styles';
import api from '../../api';

const FileUploadModal = ({ onClose, onFileUpload }) => {
	const [selectedFile, setSelectedFile] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [error, setError] = useState(null);
	const [folders, setFolders] = useState([]);
	const [selectedFolder, setSelectedFolder] = useState(null);
	const [loadingFolders, setLoadingFolders] = useState(true);

	useEffect(() => {
		const fetchFolders = async () => {
			try {
				// const response = await axios.get(
				//     'http://localhost:3000/folder',
				//     {
				//         withCredentials: true,
				//     }
				// );

				const response = await api.get('/folder');

				if (Array.isArray(response.data.folders)) {
					setFolders(response.data.folders);
				} else {
					setError('Invalid folder data received.');
				}
			} catch (err) {
				setError('Error fetching folder list.');
				console.error(err);
			} finally {
				setLoadingFolders(false);
			}
		};

		fetchFolders();
	}, []);

	const onDrop = (acceptedFiles) => {
		setSelectedFile(acceptedFiles[0]);
	};

	const onFileUploadHandler = async () => {
		if (!selectedFile) {
			setError('Please select a file to upload.');
			return;
		}

		const formData = new FormData();
		formData.append('file', selectedFile);
		formData.append('folderId', selectedFolder);

		try {
			setUploading(true);
			setError(null);

			// await axios.post('http://localhost:3000/files/upload', formData, {
			//     headers: {
			//         'Content-Type': 'multipart/form-data',
			//     },
			//     withCredentials: true,
			// });

			await api.post('/files/upload', formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			alert('File uploaded successfully!');
			onFileUpload();
			onClose();
		} catch (err) {
			setUploading(false);
			setError(`Error uploading file -- ${err}.`);
		}
	};

	const { getRootProps, getInputProps } = useDropzone({
		onDrop,
		multiple: false,
	});

	return (
		<ModalOverlay>
			<ModalContent>
				<h2>Upload a File</h2>
				<DropzoneArea {...getRootProps()}>
					<input {...getInputProps()} />
					<p>Drag and drop a file here, or click to select files</p>
				</DropzoneArea>

				{selectedFile && (
					<FileDetails>
						<p>
							<strong>Selected File:</strong> {selectedFile.name}
						</p>
					</FileDetails>
				)}

				{/* Conditionally render FolderSelect if there are folders */}
				{folders.length > 0 && (
					<FolderSelectWrapper>
						<FolderSelectLabel htmlFor="folder-select">
							Select Folder
						</FolderSelectLabel>
						<FolderSelect
							id="folder-select"
							onChange={(e) => setSelectedFolder(e.target.value)}
							value={selectedFolder || ''}
							disabled={loadingFolders}
						>
							<option value="" disabled>
								{loadingFolders
									? 'Loading folders...'
									: 'Select a folder'}
							</option>
							{folders.map((folder) => (
								<option key={folder.id} value={folder.id}>
									{folder.name}
								</option>
							))}
						</FolderSelect>
					</FolderSelectWrapper>
				)}

				<ButtonContainer>
					<UploadButton
						onClick={onFileUploadHandler}
						disabled={uploading}
					>
						{uploading ? 'Uploading...' : 'Upload'}
					</UploadButton>
					<CancelButton onClick={onClose} disabled={uploading}>
						Close
					</CancelButton>
				</ButtonContainer>

				{error && !loadingFolders && <ErrorText>{error}</ErrorText>}
			</ModalContent>
		</ModalOverlay>
	);
};

export default FileUploadModal;
