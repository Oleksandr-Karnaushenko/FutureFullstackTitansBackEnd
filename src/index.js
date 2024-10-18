import initMongoDB from './db/initMongoDB.js';
import setupServer from './server.js';
import createDirIfNotExists from './utils/createDirIfNotExists.js';

import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/users.js';

const bootstrap = async () => {
  await initMongoDB();
  createDirIfNotExists(TEMP_UPLOAD_DIR);
  createDirIfNotExists(UPLOAD_DIR);
  setupServer();
};

bootstrap();
