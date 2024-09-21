import { Module } from '@nestjs/common';
import { RedisCacheModule } from './modules/redis/redis-cache.module';

@Module({
  imports: [RedisCacheModule],
  exports: [RedisCacheModule],
})
export class DataSourcesModule {}
