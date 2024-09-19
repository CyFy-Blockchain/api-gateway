import { Body, Controller, Post } from '@nestjs/common';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SignUpDto } from '../dto/auth.dto';
import { lastValueFrom } from 'rxjs';
import { AuthClientService } from '../libs/grpc.auth.lib';
import { handleGrpcError } from '../../../utils/grpc.utils';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller()
export class AuthController {
  constructor(private readonly grpcAuthClientService: AuthClientService) {}

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
}
