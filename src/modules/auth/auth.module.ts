import { Module } from '@nestjs/common';

import { AuthController } from './controllers/auth.controller';
import { AuthClientService } from './libs/grpc.auth.lib';
import { AuthService } from './services/auth.service';
import { RedisCacheModule } from '../data-sources/modules/redis/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [AuthController],
  providers: [AuthClientService, AuthService],
})
export class AuthModule {}
