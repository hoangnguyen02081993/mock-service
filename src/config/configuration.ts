import { Configuration } from './configuration.interface';
import { Environment } from './validation';
import { LogLevel } from '@nestjs/common';

export default (): Configuration => ({
  env: process.env.NODE_ENV as Environment,
  tz: process.env.TZ,
  port: parseInt(process.env.PORT) || 3000,
  logLevel: process.env.LOG_LEVEL as LogLevel,
  serverPublicKey: process.env.SERVER_PUBLIC_KEY,
  serverPreSharedKey: process.env.SERVER_PRESHARED_KEY,
});
