import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { Options } from 'multer-storage-cloudinary'; 
import dotenv from "dotenv";
dotenv.config();



interface MyParams extends Options {
    folder?: string;
    format?: string;
    allowed_formats?: string[];
}

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "CloudinaryDemo",
        format: "png",
        allowed_formats: ["jpeg", "png", "jpg"],
    } as MyParams,
});

export { storage };
