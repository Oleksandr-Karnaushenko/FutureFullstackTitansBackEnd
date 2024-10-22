import multer from 'multer';
import createHttpError from 'http-errors';

import { TEMP_UPLOAD_DIR } from '../constants/users.js';

const storage = multer.diskStorage({
  destination: TEMP_UPLOAD_DIR,
  filename: (req, file, callback) => {
    const uniqueSuffix = Date.now();
    const filename = `${uniqueSuffix}_${file.originalname}`;
    callback(null, filename);
  },
});

const limits = {
  fileSize: 1024 * 1024 * 5,
};

const fileFilter = (req, file, callback) => {
  const extension = file.originalname.split('.').pop().toLowerCase();

  const validExtension = ['jpg', 'jpeg', 'png', 'gif'];

  if (!validExtension.includes(extension)) {
    return callback(
      createHttpError(
        400,
        `${extension} is not valid, allowed to download only jpg, jpeg, png, gif. `,
      ),
    );
  }
  callback(null, true);
};

export const upload = multer({
  storage,
  limits,
  fileFilter,
});
