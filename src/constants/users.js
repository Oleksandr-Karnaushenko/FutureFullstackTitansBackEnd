import * as path from 'node:path';

export const accessTokenLifetime = 1000 * 60 * 20;

export const refreshTokenLifetime = 1000 * 60 * 60 * 24 * 10;

export const TEMP_UPLOAD_DIR = path.resolve('temp');

export const UPLOAD_DIR = path.resolve('uploads');
