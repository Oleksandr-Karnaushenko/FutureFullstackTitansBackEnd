import WaterCollection from '../db/models/waters.js';
import createHttpError from 'http-errors';
import { getGroupedDataByDay } from '../utils/getGroupedDataByDay.js';

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


export const getMonthWater = async({filter={}})=>{

  const waterQuery = WaterCollection.find();

  if (filter.userId) {
    waterQuery.where('userId').equals(filter.userId);
  }

  if (filter.year && filter.month) {
    const monthString = filter.month.toString().padStart(2, '0');
    const regex = new RegExp(`^${filter.year}-${monthString}`);
    waterQuery.where('date').regex(regex);
  }

  const result= await waterQuery.exec();

  const data = await getGroupedDataByDay(result);

    return {
      data:data
  };
  };


