import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/internal/api');

  await app.resolve(ConfigService);

  // Enable version
  app.enableVersioning({
    defaultVersion: '1.0',
    type: VersioningType.URI,
  });

  // enable graceful shutdown
  app.enableShutdownHooks();

  const port = Number(process.env.PORT || "10000");
  await app.listen(port);
  console.log('App is running on port:', port);
}
bootstrap();
