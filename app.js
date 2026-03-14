import createError from 'http-errors';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import { errors } from 'celebrate';
import cors from 'cors';
import mongoose from 'mongoose';

import pollRouter from './routes/pollRouter.js';

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Health check endpoint
app.get('/health', async (req, res) => {
  const dbState = mongoose.connection.readyState; // 1 = connected
  const dbStatus = dbState === 1 ? 'connected' : 'disconnected';
  res.status(200).json({
    status: 'ok',
    db: dbStatus,
    timestamp: new Date(),
  });
});

// API routes
app.use('/api/v1/polls', pollRouter);

// Celebrate validation errors
app.use(errors());

// 404 handler
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler (JSON)
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message,
    error: req.app.get('env') === 'development' ? err : {},
  });
});

export default app;
