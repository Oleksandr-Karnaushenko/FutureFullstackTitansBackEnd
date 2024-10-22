import UserCollection from '../db/models/users.js';
import WaterCollection from '../db/models/waters.js';
import createHttpError from 'http-errors';

import { getGroupedDataByDay } from '../utils/getGroupedDataByDay.js';

import UserSchema from '../db/models/users.js';

export const createWater = (payload) => {
  return WaterCollection.create(payload);
};

export const updateWater = async (filter, data, options = {}) => {
  const updateData = {};
  if (data.waterVolume !== undefined) {
    if (data.waterVolume > 5000) {
      throw createHttpError(400, 'Water volume cannot exceed 5000 ml');
    }
    updateData.waterVolume = data.waterVolume;
  }

  if (data.date !== undefined) {
    updateData.date = new Date(data.date).toISOString();
  }
  const rawResult = await WaterCollection.findOneAndUpdate(filter, data, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!rawResult || !rawResult.value) return null;

  return {
    data: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};

export const deleteWater = (filter) => WaterCollection.findOneAndDelete(filter);

export const getMonthWater = async ({ filter = {} }) => {
  const waterQuery = WaterCollection.find();

  if (filter.userId) {
    waterQuery.where('userId').equals(filter.userId);
  }

  if (filter.year && filter.month) {
    const monthString = filter.month.toString().padStart(2, '0');
    const regex = new RegExp(`^${filter.year}-${monthString}`);
    waterQuery.where('date').regex(regex);
  }

  const result = await waterQuery.exec();
  // const userIdd =filter.userId;
  // const user = UserCollection.find({ _id: filter.userId });
  const user = await UserCollection.find({ _id: filter.userId });

  const userDailyNorm = user[0].dailyNorm;

  const data = await getGroupedDataByDay(result, userDailyNorm);

  return {
    data,
  };
};

export const getWaterInfoToday = async (userId) => {
  const today = new Date();
  const startCurrentDate = new Date(
    today.setUTCHours(0, 0, 0, 0),
  ).toISOString();
  const endCurrentDate = new Date(
    today.setUTCHours(23, 59, 59, 999),
  ).toISOString();
  const waterEntries = await WaterCollection.find({
    userId,
    date: {
      $gte: startCurrentDate,
      $lte: endCurrentDate,
    },
  }).sort({ date: 1 });

  console.log('object');
  console.log(waterEntries);

  if (!waterEntries || waterEntries.length === 0) {
    throw createHttpError(404, 'No water consumption records found for today');
  }

  const totalWaterVolume = waterEntries.reduce(
    (sum, item) => sum + item.waterVolume,
    0,
  );

  const user = await UserSchema.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }
  const { dailyNorm } = user;

  const waterVolumeInPercent = Math.min(
    Math.floor((totalWaterVolume / dailyNorm) * 100),
    100,
  );

  const waterVolumeTimeEntries = waterEntries.map((item) => ({
    _id: item._id,
    waterVolume: item.waterVolume,
    time: item.date.split('T')[1].substring(0, 5),
  }));

  return {
    totalWaterVolume, // Загальна кількістю випитої води за поточний день.
    waterVolumeInPercent, // Кількість випитої води у відсотках від норми за поточний день. dailyNorm - останнє відредаговане юзером.
    waterVolumeTimeEntries, // Масив записів з часом і кількістю випитої води за поточний день.
  };
};
