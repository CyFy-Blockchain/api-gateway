import { ServerHealthCheckResponse } from '../dto/server-health-check.dto';

export interface IServerHealthCheckService {
  healthCheck(): Promise<ServerHealthCheckResponse>;
}
