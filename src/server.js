import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import env from './utils/env.js';
import router from './routers/index.js';

import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

import { UPLOAD_DIR } from './constants/users.js';

dotenv.config();

const PORT = Number(env('PORT', '3000')) || 3000;

const setupServer = () => {
  const app = express();

  const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://water-tracker-front-end.vercel.app',
  ];

  const corsOptions = {
    origin: (origin, callback) => {
      if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
        callback(null, true); // Дозволити запит
      } else {
        callback(new Error('Not allowed by CORS')); // Заборонити запит
      }
    },
    credentials: true, // Дозволити куки
    optionsSuccessStatus: 200, // Для старих браузерів
  };

  app.use(express.json());
  app.use(cors(corsOptions));
  app.use(cookieParser());

  app.use('/uploads', express.static(UPLOAD_DIR));
  app.use('/api-docs', swaggerDocs());

  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
      },
    }),
  );

  app.get('/', (req, res) => {
    res.json({
      message: 'Hello in our water tracker project',
    });
  });

  app.use(router);

  app.use('*', notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

export default setupServer;
