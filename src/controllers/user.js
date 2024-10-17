import createHttpError from 'http-errors';
import env from '../utils/env.js';
import * as userServices from '../services/user.js';
import { saveFileToUploadDir } from '../utils/saveFileToUploadDir.js';
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';

export const uploadAvatarController = async (req, res, next) => {
  const { userId } = req.params;
  const avatar = req.file;

  let avatarUrl;

  if (avatar) {
    if (env('ENABLE_CLOUDINARY') === 'true') {
      avatarUrl = await saveFileToCloudinary(avatar);
    } else {
      avatarUrl = await saveFileToUploadDir(avatar);
    }
  }

  const result = await userServices.updateUser(userId, {
    ...req.body,
    avatarUrl,
  });

  if (!result) {
    next(createHttpError(404, 'User not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully added avatarUrl to user!`,
    data: result,
  });
};

export const getUserInfoController = async (req, res) => {
  const { userId } = req.params;

  const user = await userServices.getUserInfo(userId);

  res.json({
    status: 200,
    message: 'User information successfully found',
    data: user,
  });
};

export const patchUserInfoController = async (req, res, next) => {
  const { userId } = req.params;

  const data = await userServices.updateUser(userId, req.body);

  res.json({
    status: 200,
    message: `Successfully patched user!`,
    data,
  });
};