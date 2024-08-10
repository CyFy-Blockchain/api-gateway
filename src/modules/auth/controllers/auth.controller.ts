import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.services';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Checks the server's health status by invoking the server health check service.
   *
   * @returns A string representing the server's health status.
   */
  @Get()
  getHello(): string {
    return this.authService.getHello();
  }
}
