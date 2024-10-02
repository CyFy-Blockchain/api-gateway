import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

import { IServerHealthCheckService } from './server-health-check.service.interface';
import { ServerHealthCheckResponse } from '../dto/server-health-check.dto';

@Injectable()
export class ServerHealthCheckService implements IServerHealthCheckService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}
  /**
   * Retrieves a greeting message.
   *
   * @returns A string containing the greeting message "Hello World!".
   */
  async healthCheck(): Promise<ServerHealthCheckResponse> {
    await this.cacheManager.set('health-check', 'Redis is healthy');
    const value = await this.cacheManager.get('health-check');
    await this.cacheManager.del('health-check');
    return {
      nestServerCheck: 'success',
      redisServerCheck: value === 'Redis is healthy' ? 'success' : 'failure',
    };
  }
}
