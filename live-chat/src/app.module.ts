import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserService } from './users/user-service/user.service';
import { UserController } from './users/user-controller/user.controller';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { GatewayModule } from './gateway/gateway.module';

@Module({
  imports: [GatewayModule],
  controllers: [AppController, UserController],
  providers: [AppService, UserService, PrismaModule, PrismaService],
})
export class AppModule {}
