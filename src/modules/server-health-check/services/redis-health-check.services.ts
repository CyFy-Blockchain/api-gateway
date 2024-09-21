import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class RedisHealthCheckService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  /**
   * Checks the health of the Redis instance.
   *
   * @returns A promise that resolves to a string indicating the health status of the Redis instance, or an error if the instance is not reachable.
   */
  async checkHealth(): Promise<string | unknown> {
    try {
      await this.cacheManager.set('health-check', 'Redis is healthy');
      const value = await this.cacheManager.get('health-check');
      await this.cacheManager.del('health-check');
      return value;
    } catch (error) {
      throw new Error('Redis is not reachable');
    }
  }
}
