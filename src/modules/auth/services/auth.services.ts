import { Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  /**
   * Retrieves a greeting message.
   *
   * @returns A string containing the greeting message "Hello World!".
   */
  getHello(): string {
    return 'Hello World!';
  }
}
