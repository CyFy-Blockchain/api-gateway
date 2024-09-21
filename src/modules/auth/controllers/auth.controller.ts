import { Body, Controller, Post } from '@nestjs/common';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginDto, LoginResponse, SignUpDto } from '../dto/auth.dto';
import { lastValueFrom } from 'rxjs';
import { AuthClientService } from '../libs/grpc.auth.lib';
import { handleGrpcError } from '../../../utils/grpc.utils';
import { AuthService } from '../services/auth.service';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller()
export class AuthController {
  constructor(
    private readonly grpcAuthClientService: AuthClientService,
    private readonly authService: AuthService,
  ) {}

  /**
   * Signs up a new user using the AuthClientService's signup method.
   * @param signupInput The input data containing the user's information.
   * @returns A boolean value indicating the success of the signup operation.
   */
  @Post()
  @ApiOperation({ summary: 'Signup user' })
  @ApiResponse({ status: 201, description: 'Success.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async signup(@Body() signupInput: SignUpDto): Promise<boolean> {
    try {
      const signupResponse = await lastValueFrom(
        this.grpcAuthClientService.signup(signupInput),
      );
      return signupResponse;
    } catch (error) {
      console.error('🚀 ~ HeroesController ~ createHero ~ error:', error);
      handleGrpcError(error);
    }
  }

  /**
   * Logs in a user using the AuthClientService's login method.
   * @param loginInput The input data containing the user's login credentials.
   * @returns A LoginResponse object containing the user's authentication token and other relevant information upon successful login.
   * @throws An error if the login operation fails.
   */
  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'Success.', type: LoginResponse }) // Adjust the type as needed
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  async login(@Body() loginInput: LoginDto): Promise<LoginResponse> {
    try {
      const loginResponse = await lastValueFrom(
        this.grpcAuthClientService.login(loginInput),
      );
      await this.authService.loginEntry(loginResponse);
      return loginResponse;
    } catch (error) {
      console.error('🚀 ~ AuthController ~ login ~ error:', error);
      handleGrpcError(error);
    }
  }
}
