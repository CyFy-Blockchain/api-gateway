import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthClientService } from './libs/grpc.auth.lib';

@Module({
  imports: [],
  controllers: [AuthController],
  providers: [AuthClientService],
})
export class AuthModule {}
