import 'reflect-metadata';

import { writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { API_GLOBAL_PREFIX, createOpenApiDocument } from './swagger';

async function generateOpenApiFile() {
  const app = await NestFactory.create(AppModule, { logger: false });
  app.setGlobalPrefix(API_GLOBAL_PREFIX);

  const document = createOpenApiDocument(app);
  const outputPath = join(__dirname, '..', 'openapi.json');

  await writeFile(outputPath, JSON.stringify(document, null, 2), 'utf8');
  await app.close();
}

generateOpenApiFile().catch((error) => {
  console.error(error);
  process.exit(1);
});
