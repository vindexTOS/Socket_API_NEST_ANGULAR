import { Module } from '@nestjs/common';
import { MyGateWay } from './gateway';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [MyGateWay],
  imports: [PrismaModule],
})
export class GatewayModule {}
