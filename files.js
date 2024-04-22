const multer = require('multer');
const path = require('path');
const { fs } = require('./modules');
const unlinkAsync = fs.promises.unlink;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const destinationPath = path.resolve(__dirname, 'uploads');
        cb(null, destinationPath);
    },
    filename: (req, file, cb) => {
        const fileName = req.query.fileName;
        cb(null, fileName);
    },
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['.pdf', '.jpeg', '.png', '.jpg'];
    const extname = path.extname(file.originalname).toLowerCase();
    if (allowedFileTypes.includes(extname)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type'));
    }
};

const upload = multer({ storage, fileFilter });

const handleFileDeletion = async (req, res) => {
    try {
        const { id } = req.params
        const uploadDirectory = path.join(__dirname, 'uploads');

        const files = await fs.promises.readdir(uploadDirectory);

        // Assuming the filename follows the format "Asiya B.-resume..."
        const fileNamePrefix = `${id}-resume`;

        // Filter files that match the specified prefix
        const matchingFiles = files.filter(file => file.startsWith(fileNamePrefix));

        if (matchingFiles.length > 0) {
            // Delete each matching file
            await Promise.all(matchingFiles.map(async file => {
                const filePath = path.join(uploadDirectory, file);
                await unlinkAsync(filePath);
            }));

            res.json({ success: true, message: 'Files deleted successfully.' });
        } else {
            res.status(200).json({ success: true, message: 'No matching files found.' });
        }
    } catch (error) {
        console.error('Error deleting files:', error);
        res.status(400).json({ message: error.message });
    }
};

module.exports = { upload, handleFileDeletion };
