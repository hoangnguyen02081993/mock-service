import { Body, Controller, Delete, HttpCode, InternalServerErrorException, NotFoundException, Post, Query } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Controller({
  path: 'peers',
  version: "1.0",
})
export class PeerController {
  constructor(private configService: ConfigService) {}

  @Post("/exchange-profile")
  async createPeerProfile(@Body() payload: any): Promise<any> {
    console.log(`Receive the request to create the peer with payload:`, payload)
    return {
        data: {
            serverPublicKey: this.configService.get<string>('serverPublicKey'),
            presharedKey: payload.isPresharedKey ? this.configService.get<string>('serverPreSharedKey'): undefined,
            allowIps: this.randomAllowIps('10.0.', 16),
        }
    }
  }

  @Delete()
  @HttpCode(204)
  async removePeerProfile(@Body() payload: any): Promise<void> {
    console.log(`Receive the request to remove the peer with clientPublicKey:`, payload.clientPublicKey)
    if (payload.clientPublicKey === 'notfoud-key') {
      throw new NotFoundException(`The peer with clientPublicKey: ${payload.clientPublicKey} not found`);
    } else if (payload.clientPublicKey === 'error-key') {
      throw new InternalServerErrorException(`The peer with clientPublicKey: ${payload.clientPublicKey} has some error`);
    } else if (payload.clientPublicKey === 'timeout-key') {
      await new Promise(resolve => setTimeout(resolve, 60000));
    }
  }

  private randomAllowIps(prefix: string, subnetMask: number = 32) {
    return [`${this.randomIp(prefix)}/${subnetMask}`]
  }

  private randomIp(prefix: string): string {
    const ip = Array(2).fill(0).map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0)).join('.');
    return `${prefix}${ip}`
  }
}
