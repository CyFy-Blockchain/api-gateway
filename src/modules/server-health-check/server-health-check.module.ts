import { Module } from '@nestjs/common';

import { ServerHealthCheckController } from './controllers/server-health-check.controller';
import { ServerHealthCheckService } from './services/server-health-check.services';
import { RedisHealthCheckController } from './controllers/redis-health-check.controller';
import { RedisHealthCheckService } from './services/redis-health-check.services';
import { RedisCacheModule } from '../data-sources/modules/redis/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  controllers: [ServerHealthCheckController, RedisHealthCheckController],
  providers: [ServerHealthCheckService, RedisHealthCheckService],
})
export class ServerHealthCheckModule {}
