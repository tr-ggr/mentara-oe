import { getRuntimeEnv, parseAllowedOrigins } from './env.js';

describe('env config', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    process.env = {
      ...originalEnv,
      DATABASE_URL: 'postgresql://postgres:postgres@localhost:5432/mentara_oe',
      BETTER_AUTH_SECRET: 'replace-with-a-long-random-secret',
      BETTER_AUTH_URL: 'http://localhost:3001/api/auth',
    };
    delete process.env.CORS_ALLOWED_ORIGINS;
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  it('uses localhost origin by default when CORS_ALLOWED_ORIGINS is unset', () => {
    const env = getRuntimeEnv();
    expect(env.allowedOrigins).toEqual(['http://localhost:3000']);
  });

  it('parses and normalizes comma-separated origins', () => {
    process.env.CORS_ALLOWED_ORIGINS =
      'http://localhost:3000/, http://127.0.0.1:3000, http://localhost:3000';

    const env = getRuntimeEnv();
    expect(env.allowedOrigins).toEqual([
      'http://localhost:3000',
      'http://127.0.0.1:3000',
    ]);
  });

  it('throws when CORS_ALLOWED_ORIGINS resolves to no origins', () => {
    expect(() => parseAllowedOrigins(' ,  ')).toThrow(
      'CORS_ALLOWED_ORIGINS must include at least one origin.',
    );
  });
});
