import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const API_GLOBAL_PREFIX = 'api';

export function createOpenApiDocument(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Mentara OE API')
    .setDescription('OpenAPI definition for generated API client code.')
    .setVersion('1.0.0')
    .build();

  return SwaggerModule.createDocument(app, config);
}
