import 'reflect-metadata';

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import express from 'express';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './app/auth/auth.js';
import { AppModule } from './app/app.module.js';
import { API_GLOBAL_PREFIX } from './swagger.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  const server = app.getHttpAdapter().getInstance();
  server.all(/^\/api\/auth\/.*/, toNodeHandler(auth));
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));
  app.setGlobalPrefix(API_GLOBAL_PREFIX);

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${API_GLOBAL_PREFIX}`,
  );
}

bootstrap();
