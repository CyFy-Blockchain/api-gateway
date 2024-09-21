import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';

import { RedisHealthCheckService } from '../services/redis-health-check.services';

@ApiTags(SWAGGER_TAGS.REDIS_HEALTH_CHECK)
@Controller('redis')
export class RedisHealthCheckController {
  constructor(
    private readonly redisHealthCheckService: RedisHealthCheckService,
  ) {}

  /**
   * Checks the health of the Redis server.
   *
   * @returns A promise that resolves to a string or an object representing the health status of the Redis server.
   * If the check is successful, it will return a string indicating the server is healthy. If an error occurs during the check, it will throw an `InternalServerErrorException` with the error message.
   */
  @Get()
  @ApiOperation({ summary: 'Redis Server Health Check' })
  async checkHealth(): Promise<string | unknown> {
    try {
      return await this.redisHealthCheckService.checkHealth();
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
