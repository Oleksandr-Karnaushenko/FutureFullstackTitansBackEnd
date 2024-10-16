// import { Conflict, Unauthorized } from 'http-errors';
import pkg from 'http-errors';
const { Conflict, Unauthorized } = pkg;

import bcrypt from 'bcrypt';
import model from '../db/models/user.js';
const { User } = model;
import createToken from '../utils/createToken.js';

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict('Email in use');
  }

  const newUser = new User({
    name,
    email,
    avatarURL: null,
    phone: null,
    skype: null,
    birthday: null,
  });
  await newUser.setPassword(password);

  const payload = {
    id: newUser._id,
  };
  const token = createToken(payload);
  newUser.token = token;

  await newUser.save();

  res.status(201).json({
    message: 'Registration completed successfully',
    dataUser: {
      name: newUser.name,
      email: newUser.email,
      birthday: newUser.birthday,
      phone: newUser.phone,
      skype: newUser.skype,
      avatarURL: newUser.avatarURL,
      token: newUser.token,
    },
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  const passwordCompare = bcrypt.compareSync(password, user.password);
  if (!user || !passwordCompare) {
    throw Unauthorized('Email or password is wrong');
  }

  const payload = {
    id: user._id,
  };

  const token = createToken(payload);
  await User.findByIdAndUpdate(user._id, { token });

  res.status(200).json({
    message: 'Login completed successfully',
    dataUser: {
      name: user.name,
      email: user.email,
      birthday: user.birthday,
      phone: user.phone,
      avatarURL: user.avatarURL,
      skype: user.skype,
      token,
    },
  });
};

export const logout = async (req, res) => {
  const { _id } = req.user;
  await User.findByIdAndUpdate(_id, { token: null });

  res.status(204).json({
    message: 'Logout completed successfully',
  });
};
