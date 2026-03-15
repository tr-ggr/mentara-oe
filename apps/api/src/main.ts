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
import { getRuntimeEnv } from './app/config/env.js';
import { AppModule } from './app/app.module.js';
import { API_GLOBAL_PREFIX } from './swagger.js';

async function bootstrap() {
  const env = getRuntimeEnv();
  const app = await NestFactory.create(AppModule, { bodyParser: false });
  app.enableCors({
    origin(
      origin: string | undefined,
      callback: (error: Error | null, allow?: boolean) => void,
    ) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (env.allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`Origin not allowed by CORS: ${origin}`));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  });

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
