import { v2 as cloudinary } from 'cloudinary';
import config from '../config';

export const sendImageToCloudinary = async () => {
  // Configuration
  cloudinary.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api_key,
    api_secret: config.cloudinary_api_access_secret,
  });

  // Upload an image
  const uploadResult = await cloudinary.uploader
    .upload(config.cloudinary_upload_url as string, {
      public_id: 'shoes',
    })
    .catch((error) => {
      console.log(error);
    });

  console.log(uploadResult);

  // Optimize delivery by resizing and applying auto-format and auto-quality
  const optimizeUrl = cloudinary.url('shoes', {
    fetch_format: 'auto',
    quality: 'auto',
  });

  console.log(optimizeUrl);
};
