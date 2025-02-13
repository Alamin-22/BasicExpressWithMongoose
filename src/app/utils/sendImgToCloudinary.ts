import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import config from '../config';
import multer from 'multer';
import fs from 'fs';

export const sendImageToCloudinary = async (
  imageName: string,
  path: string,
): Promise<UploadApiResponse> => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_cloud_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_access_secret,
  });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(path, {
      public_id: imageName,
    });

    fs.unlink(path, (err) => {
      if (err) {
        console.log(err);
      } else {
        console.log("File is Deleted");
      }
    });

    return uploadResult; // Ensure a valid response is always returned
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + '/uploads');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
