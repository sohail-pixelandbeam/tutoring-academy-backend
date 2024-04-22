const express = require('express');
const { upload, handleFileDeletion } = require('../files');
const FILE_ROUTER = express.Router();

const handleFileUpload = (req, res) => {
    const filePath = req.file.path;
    res.json({ filePath });
};

// Route for /upload
FILE_ROUTER.post('/upload', upload.single('file'), handleFileUpload);
FILE_ROUTER.delete('/delete-file/:id', handleFileDeletion);
module.exports = FILE_ROUTER;