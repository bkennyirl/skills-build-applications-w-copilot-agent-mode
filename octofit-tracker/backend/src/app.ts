import express, { Express } from 'express';
import { errorHandler, notFoundHandler } from './middleware/errorHandlers';
import apiRouter from './routes';

const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware for development
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }

  next();
});

// API routes
app.use('/api', apiRouter);

// Error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

export default app;