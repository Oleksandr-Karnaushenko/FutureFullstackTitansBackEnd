import cloudinary from 'cloudinary';
import fs from 'node:fs/promises';

import env from './env.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.v2.config({
  secure: true,
  cloud_name: env(CLOUDINARY.CLOUD_NAME),
  api_key: env(CLOUDINARY.API_KEY),
  api_secret: env(CLOUDINARY.API_SECRET),
});

const transformationSettings = {
  gravity: 'face',
  height: 160,
  width: 160,
  crop: 'thumb',
  quality: 'auto',
  fetch_format: 'auto',
};

export const saveFileToCloudinary = async (file, folder) => {
  const response = await cloudinary.v2.uploader.upload(file.path, {
    folder: folder,
    transformation: [transformationSettings],
  });

  await fs.unlink(file.path);
  return response.secure_url;
};
