import { Module } from '@nestjs/common';
import { CacheModule } from '@nestjs/cache-manager';
import * as redisStore from 'cache-manager-ioredis';
import { RedisClientOptions } from 'redis';

import { redisConfig } from '../../../../config/redis/redis.config';

@Module({
  imports: [
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      ...redisConfig,
    }),
  ],
  exports: [CacheModule],
})
export class RedisCacheModule {}
