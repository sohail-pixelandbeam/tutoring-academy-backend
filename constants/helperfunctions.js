const { fs, path } = require("../modules");

const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

const deleteFolderContents = (folderPath) => {
    // Ensure the folder exists
    if (!fs.existsSync(folderPath)) {
        console.error("Folder does not exist");
        return;
    }

    // Get all files and subdirectories within the folder
    const files = fs.readdirSync(folderPath);
    console.log('deleting folders')

    // Iterate through each file/directory and delete it
    files.forEach(file => {
        const filePath = path.join(folderPath, file);
        // Check if it's a file or a directory
        const isDirectory = fs.lstatSync(filePath).isDirectory();

        if (isDirectory) {
            // If it's a directory, recursively call deleteFolderContents
            deleteFolderContents(filePath);
            // After deleting all contents, remove the directory itself
            fs.rmdirSync(filePath);
        } else {
            // If it's a file, simply delete it
            fs.unlinkSync(filePath);
        }
    });
}

module.exports = {
    capitalizeFirstLetter,
    deleteFolderContents
};