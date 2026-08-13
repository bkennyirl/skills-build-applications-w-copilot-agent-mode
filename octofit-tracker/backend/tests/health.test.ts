import request from 'supertest';
import { describe, expect, it } from 'vitest';
import app from '../src/app';

describe('GET /api/health', () => {
  it('returns API health information', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      status: 'OK',
      message: 'OctoFit Tracker Backend is running'
    });
    expect(typeof response.body.baseUrl).toBe('string');
  });
});
