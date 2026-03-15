import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/',
  datasource: {
    url:
      process.env.DATABASE_URL ??
      'postgresql://postgres:postgres@localhost:5432/mentara_oe',
  },
  migrations: {
    path: 'prisma/migrations',
  },
});
