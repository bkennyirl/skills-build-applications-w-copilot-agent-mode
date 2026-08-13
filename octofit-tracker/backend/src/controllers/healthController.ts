import { Request, Response } from 'express';
import mongoose from 'mongoose';

export const getHealth = (_req: Request, res: Response) => {
  const codespaceName = process.env.CODESPACE_NAME;
  const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  res.json({
    status: 'OK',
    message: 'OctoFit Tracker Backend is running',
    baseUrl,
    database: mongoose.connection.readyState === 1 ? 'Connected' : 'Connecting'
  });
};