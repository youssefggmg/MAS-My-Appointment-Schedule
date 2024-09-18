import { storage } from "../helpers/cloadinaryConfig";
import multer from "multer"


const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const allowedFormats = ['image/jpeg', 'image/png', 'image/jpg'];
        if (!allowedFormats.includes(file.mimetype)) {
            return cb(new Error('Invalid file type. Only JPEG, PNG, and JPG are allowed.'));
        }
        cb(null, true);
    }
})

export default upload;