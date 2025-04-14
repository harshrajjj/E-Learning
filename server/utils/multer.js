import multer from 'multer';

const upload = multer({
    dest: 'uploads/',
});
export default upload;
// This code sets up a multer instance that stores uploaded files in the 'uploads/' directory.