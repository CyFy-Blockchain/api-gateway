import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';

import { ServerHealthCheckService } from '../services/server-health-check.services';
import { ServerHealthCheckResponse } from '../dto/server-health-check.dto';

@ApiTags(SWAGGER_TAGS.HEALTH_CHECK)
@Controller()
export class ServerHealthCheckController {
  constructor(
    private readonly serverHealthCheckService: ServerHealthCheckService,
  ) {}

  /**
   * Checks the server's health status by invoking the server health check service.
   *
   * @returns A string representing the server's health status.
   */
  @Get()
  @ApiOperation({ summary: 'Server Health Check' })
  getHello(): Promise<ServerHealthCheckResponse> {
    return this.serverHealthCheckService.healthCheck();
  }
}
