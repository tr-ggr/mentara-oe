import 'reflect-metadata';

import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import { API_GLOBAL_PREFIX, createOpenApiDocument } from './swagger.js';

async function generateOpenApiFile() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix(API_GLOBAL_PREFIX);

  const document = createOpenApiDocument(app);
  const outputPath = resolve(process.cwd(), 'apps/api/openapi.json');

  await writeFile(outputPath, JSON.stringify(document, null, 2), 'utf8');
  await app.close();
}

generateOpenApiFile().catch((error) => {
  console.error(error);
  process.exit(1);
});
