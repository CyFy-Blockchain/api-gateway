import { Injectable } from '@nestjs/common';

import { IServerHealthCheckService } from './server-health-check.service.interface';
import { ServerHealthCheckResponse } from '../dto/server-health-check.dto';

@Injectable()
export class ServerHealthCheckService implements IServerHealthCheckService {
  /**
   * Retrieves a greeting message.
   *
   * @returns A string containing the greeting message "Hello World!".
   */
  async healthCheck(): Promise<ServerHealthCheckResponse> {
    return {
      nestServerCheck: 'success',
    };
  }
}
