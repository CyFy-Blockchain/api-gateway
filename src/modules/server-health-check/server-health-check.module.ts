import { Module } from '@nestjs/common';

import { ServerHealthCheckController } from './controllers/server-health-check.controller';
import { ServerHealthCheckService } from './services/server-health-check.services';
import { RedisCacheModule } from '../data-sources/modules/redis/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [ServerHealthCheckController],
  providers: [ServerHealthCheckService],
})
export class ServerHealthCheckModule {}
