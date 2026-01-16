import { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Heading2 } from '../styles/Headings.styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faCircleInfo,
	faFileArrowDown,
	faTrash,
	faPen,
	faSyncAlt,
} from '@fortawesome/free-solid-svg-icons';
import {
	Container,
	Header,
	ImagePreviewContainer,
	Details,
	DownloadButton,
	ImageContainer,
} from '../styles/FileDetails.styles';

import {
	ErrorText,
	ModalContent,
	ModalOverlay,
	UploadButton,
	ButtonContainer,
	CancelButton,
} from '../styles/UploadFile.styles';
import { FolderInput } from '../styles/FolderDetails.styles';

const FileDetails = () => {
	const { id } = useParams();
	const [file, setFile] = useState(null);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [isDetailsVisible, setIsDetailsVisible] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [newName, setNewName] = useState('');
	const [imageWidth, setImageWidth] = useState(0);
	const [imageLoading, setImageLoading] = useState(true);

	const navigate = useNavigate();
	const imageRef = useRef(null);

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(
					`http://localhost:3000/files/${id}`,
					{ withCredentials: true },
				);
				setFile(response.data.fileDetails);
				setNewName(response.data.fileDetails.name);

				const signedUrlResponse = await axios.get(
					`http://localhost:3000/files/signed-url/${id}`,
					{ withCredentials: true },
				);
				setFile((prevFile) => ({
					...prevFile,
					signedUrl: signedUrlResponse.data.signedUrl,
				}));
			} catch (error) {
				setError(error);
			} finally {
				setLoading(false);
			}
		})();
	}, [id]);

	const handleDownload = async () => {
		try {
			const response = await axios.get(
				`http://localhost:3000/files/signed-url/${id}`,
			);

			const { signedUrl } = response.data;

			if (!signedUrl) {
				console.error('No signed URL received from the backend');
				return;
			}

			const link = document.createElement('a');
			link.href = signedUrl;
			link.setAttribute('download', file.name);
			link.click();
			document.body.removeChild(link);
		} catch (error) {
			console.error('Error downloading file:', error);
		}
	};

	const getFileType = (filename) => {
		const extension = filename.split('.').pop().toLowerCase();
		if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(extension))
			return 'image';
		if (['pdf'].includes(extension)) return 'pdf';
		return 'other';
	};

	const handleImageLoad = () => {
		if (imageRef.current) {
			setImageWidth(imageRef.current.offsetWidth);
			setImageLoading(false);
		}
	};

	const openDeleteModal = () => setIsDeleteModalOpen(true);
	const closeDeleteModal = () => setIsDeleteModalOpen(false);

	const openEditModal = () => setIsEditModalOpen(true);
	const closeEditModal = () => setIsEditModalOpen(false);

	const handleDeleteFile = async () => {
		try {
			await axios.delete(`http://localhost:3000/files/${id}`, {
				withCredentials: true,
			});
			navigate('/files');
		} catch (err) {
			setError('Error deleting file.');
			console.error(err);
		}
	};

	const handleUpdateFileName = async () => {
		if (!newName.trim()) {
			alert('Please enter a new name for the file.');
			return;
		}

		try {
			await axios.put(
				`http://localhost:3000/files/${id}`,
				{ name: newName },
				{ withCredentials: true },
			);
			// setFile(response.data);

			setFile((prevFile) => ({
				...prevFile,
				name: newName,
			}));

			const signedUrlResponse = await axios.get(
				`http://localhost:3000/files/signed-url/${id}`,
				{ withCredentials: true },
			);

			setFile((prevFile) => ({
				...prevFile,
				signedUrl: signedUrlResponse.data.signedUrl,
			}));

			closeEditModal();
		} catch (err) {
			setError('Error updating file name.');
			console.error(err);
		}
	};

	if (loading) return <p>Loading file details...</p>;
	if (error) return <p>{error}</p>;

	const fileType = getFileType(file.name);

	return (
		<Container>
			<Heading2>File Details</Heading2>

			{fileType === 'image' && (
				<Header>
					<DownloadButton onClick={handleDownload}>
						<FontAwesomeIcon icon={faFileArrowDown} />
						Download
					</DownloadButton>
					<DownloadButton
						onClick={() => setIsDetailsVisible(!isDetailsVisible)}
					>
						<FontAwesomeIcon icon={faCircleInfo} />
						Details
					</DownloadButton>
					<UploadButton onClick={openDeleteModal}>
						<FontAwesomeIcon icon={faTrash} />
						Delete
					</UploadButton>
					<UploadButton onClick={openEditModal}>
						<FontAwesomeIcon icon={faPen} />
						Edit Name
					</UploadButton>
				</Header>
			)}

			<ImagePreviewContainer $isDetailsVisible={isDetailsVisible}>
				<ImageContainer
					$isDetailsVisible={isDetailsVisible}
					$imageWidth={imageWidth}
				>
					<div className="image-frame">
						{imageLoading && (
							<div className="loading-placeholder">
								Loading...
							</div>
						)}
						<img
							ref={imageRef}
							key={file.signedUrl}
							src={file.signedUrl}
							alt={file.name}
							onLoad={handleImageLoad}
						/>
						<div className="text-overlay">
							<p>{file.name}</p>
						</div>
					</div>
				</ImageContainer>

				{isDetailsVisible && (
					<Details>
						<p>
							<strong>Name:</strong> {file.name}
						</p>
						<p>
							<strong>Size:</strong>{' '}
							{(file.size / 1024).toFixed(2)} KB
						</p>
						<p>
							<strong>Uploaded by:</strong> {file.owner.username}
						</p>
						<p>
							<strong>Upload Time:</strong>{' '}
							{new Date(file.uploadTime).toLocaleString()}
						</p>
					</Details>
				)}
			</ImagePreviewContainer>

			{fileType === 'pdf' && (
				<div>
					<h3>Preview:</h3>
					<embed
						src={file.signedUrl}
						type="application/pdf"
						width="100%"
						height="600px"
					/>
				</div>
			)}

			{fileType === 'other' && <p>Unable to preview this file type.</p>}

			{isDeleteModalOpen && (
				<ModalOverlay>
					<ModalContent>
						<Heading2>
							Are you sure you want to delete this file?
						</Heading2>
						<ButtonContainer>
							<UploadButton onClick={handleDeleteFile}>
								Yes, Delete
							</UploadButton>
							<CancelButton onClick={closeDeleteModal}>
								Cancel
							</CancelButton>
						</ButtonContainer>

						{error && <ErrorText>{error}</ErrorText>}
					</ModalContent>
				</ModalOverlay>
			)}

			{isEditModalOpen && (
				<ModalOverlay>
					<ModalContent>
						<Heading2>Edit File Name</Heading2>
						<FolderInput
							type="text"
							value={newName}
							onChange={(e) => setNewName(e.target.value)}
							placeholder="Enter new file name"
						/>
						<ButtonContainer>
							<UploadButton onClick={handleUpdateFileName}>
								<FontAwesomeIcon icon={faSyncAlt} />
								Update Name
							</UploadButton>
							<CancelButton onClick={closeEditModal}>
								Cancel
							</CancelButton>
						</ButtonContainer>

						{error && <ErrorText>{error}</ErrorText>}
					</ModalContent>
				</ModalOverlay>
			)}
		</Container>
	);
};

export default FileDetails;
