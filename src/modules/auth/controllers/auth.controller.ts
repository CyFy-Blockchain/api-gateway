import { Controller, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.services';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(SWAGGER_TAGS.AUTH)
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
