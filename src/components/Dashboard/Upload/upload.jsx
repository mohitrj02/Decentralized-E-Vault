import React, { useState } from 'react';
import { Button, TextField, Typography, CircularProgress, Snackbar } from '@mui/material';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { useWallet } from '../../Wallet/Wallet'; // Adjust the path as needed

const Upload = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [fileType, setFileType] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { account, contract, connectMetaMask } = useWallet();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileNameChange = (e) => {
    setFileName(e.target.value);
  };

  const handleFileTypeChange = (e) => {
    setFileType(e.target.value);
  };

  const encryptFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const encrypted = CryptoJS.AES.encrypt(reader.result, 'secret key').toString();
        resolve(encrypted);
      };
      reader.onerror = () => reject('Encryption failed');
      reader.readAsBinaryString(file);
    });
  };

  const uploadToPinata = async (encryptedFile) => {
    const formData = new FormData();
    formData.append('file', new Blob([encryptedFile]), file.name);

    try {
      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${process.env.REACT_APP_PINATA_JWT}`, // Use the environment variable for Pinata JWT
        },
      });
      return response.data.IpfsHash; // CID
    } catch (error) {
      throw new Error('Upload to Pinata failed');
    }
  };

  const storeInBlockchain = async (cid) => {
    if (!contract || !account) {
      setErrorMessage('Please connect MetaMask first.');
      return;
    }

    try {
      await contract.uploadFile(fileName, fileType, cid);
      setSuccessMessage('File successfully uploaded and stored on the blockchain!');
    } catch (error) {
      setErrorMessage('Blockchain storage failed');
    }
  };

  const handleUpload = async () => {
    if (!file || !fileName || !fileType) {
      setErrorMessage('All fields are required!');
      return;
    }

    setLoading(true);
    try {
      await connectMetaMask(); // Ensure MetaMask is connected
      const encryptedFile = await encryptFile(file);
      const cid = await uploadToPinata(encryptedFile);
      await storeInBlockchain(cid);
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Typography variant="h6" gutterBottom>Upload File</Typography>
      <TextField
        type="file"
        onChange={handleFileChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="File Name"
        value={fileName}
        onChange={handleFileNameChange}
        fullWidth
        margin="normal"
      />
      <TextField
        label="File Type"
        value={fileType}
        onChange={handleFileTypeChange}
        fullWidth
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={loading}
        fullWidth
      >
        {loading ? <CircularProgress size={24} /> : 'Upload'}
      </Button>
      {successMessage && <Snackbar open autoHideDuration={6000} message={successMessage} />}
      {errorMessage && <Snackbar open autoHideDuration={6000} message={errorMessage} />}
    </div>
  );
};

export default Upload;
