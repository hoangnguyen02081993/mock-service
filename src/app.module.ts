import { Module } from '@nestjs/common';
import { PeerModule } from './modules/peer/peer.module';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { validate } from './config/validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validate: validate,
      validationOptions: {
        abortEarly: true,
      },
    }),
    PeerModule,
  ],
})
export class AppModule {}
