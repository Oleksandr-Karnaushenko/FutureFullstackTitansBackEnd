import * as userServices from '../services/user.js';

export const uploadAvatarController = async (req, res) => {
  const { userId } = req.params;
  const avatar = req.file;
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
