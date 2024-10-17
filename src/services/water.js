import WaterCollection from '../db/models/waters.js';
import createHttpError from 'http-errors';

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

export const getWaterInfoToday = async (userId) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const waterEntries = await WaterCollection.find({
    date: currentDate,
    userId,
  }).sort({ updatedAt: 1 });

  if (!waterEntries || waterEntries.length === 0) {
    throw {
      status: 404,
      message: 'No water consumption records found for today',
    };
  }

  const totalWaterVolume = waterEntries.reduce(
    (sum, item) => sum + item.waterVolume,
    0,
  );

  const dailyNorm = waterEntries[waterEntries.length - 1].dailyNorm;

  const waterVolumeInPercent = Math.min(
    (totalWaterVolume / dailyNorm) * 100,
    100,
  );

  const waterVolumeTimeEntries = waterEntries.map((item) => ({
    waterVolume: item.waterVolume,
    time: item.createdAt.toISOString().split('T')[1].split('.')[0],
  }));

  return {
    totalWaterVolume, // Загальна кількістю випитої води за поточний день.
    waterVolumeInPercent, // Кількість випитої води у відсотках від норми за поточний день. dailyNorm - останнє відредаговане юзером.
    waterVolumeTimeEntries, // Масив записів з часом і кількістю випитої води за поточний день.
  };
};
