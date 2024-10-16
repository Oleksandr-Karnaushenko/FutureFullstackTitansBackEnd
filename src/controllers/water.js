import createHttpError from 'http-errors';

import * as waterServices from '../services/water.js';

export const addWaterController = async (req, res) => {
  const { waterVolume, userId, date } = req.body;
  if (waterVolume > 5000) {
    throw createHttpError(400, 'Water volume cannot exceed 5000 ml');
  }

  if (!date) {
    throw createHttpError(400, 'Date is required');
  }

  const data = await waterServices.createWater({
    waterVolume,
    userId,
    date: new Date(date).toISOString(),
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully add record',
    data,
  });
};

export const upsertWaterController = async (req, res) => {
  const { id } = req.params;
  const { isNew, data } = await waterServices.updateWater(
    { _id: id },
    req.body,
    { upsert: true },
  );

  const status = isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Water record upsert successfully',
    data,
  });
};

export const patchWaterController = async (req, res) => {
  const { id } = req.params;
  const result = await waterServices.updateWater({ _id: id }, req.body);
  if (!result) {
    throw createHttpError(404, 'Water record not found');
  }
  res.json({
    status: 200,
    message: 'Successfully patched a water record!',
    data: result.data,
  });
};

export const deleteWaterController = async (req, res) => {
  const { id } = req.params;
  const data = await waterServices.deleteWater({ _id: id });
  if (!data) {
    throw createHttpError(404, 'Water record not found');
  }

  res.status(204).send();
};
