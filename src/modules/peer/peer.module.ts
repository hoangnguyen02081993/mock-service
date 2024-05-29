import { Module } from '@nestjs/common';
import { PeerController } from './controllers/peer.controller';

@Module({
  imports: [],
  controllers: [PeerController],
  providers: [],
})
export class PeerModule {}
