import { LogLevel } from '@nestjs/common';
import { Environment } from './validation';

export interface Configuration {
  tz: string;
  port: number;
  env: Environment;
  logLevel: LogLevel;
  serverPublicKey: string;
  serverPreSharedKey: string;
}
