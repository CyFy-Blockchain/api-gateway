import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SWAGGER_TAGS } from 'src/config/swagger/tags';
import {
  GetOrgUsersListResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  SigninUserRequest,
  SigninUserResponse,
} from '../dto/auth.dto';
import { authClient } from 'src/apiClients/authClient/authClient';
import { SwaggerAuth } from 'src/utils/decorators/swaggerAuth.decorator';

@ApiTags(SWAGGER_TAGS.AUTH)
@Controller()
export class AuthController {
  @Post('/')
  @ApiOperation({ summary: 'Sign In User' })
  @ApiResponse({
    status: 201,
    description: 'User has been signed in successfully',
    type: SigninUserResponse,
  })
  async signinUser(
    @Body() body: SigninUserRequest,
  ): Promise<SigninUserResponse> {
    return await authClient.signin(body);
  }

  @Post('/register')
  @ApiOperation({ summary: 'Register a new User' })
  @ApiResponse({
    status: 201,
    description: 'User has been registered successfully',
    type: SigninUserResponse,
  })
  @SwaggerAuth()
  async registerUser(
    @Body() body: RegisterUserRequest,
    @Req() request: Request,
  ): Promise<RegisterUserResponse> {
    const token = request.headers['token'];
    return await authClient.registerUser(body, token);
  }

  @Get('/orgUsers/:orgName')
  @ApiOperation({ summary: 'Fetch all Users in Org' })
  @ApiResponse({
    status: 200,
    description: 'Users in an organization',
    type: GetOrgUsersListResponse,
  })
  @SwaggerAuth()
  async fetchUserList(
    @Param('orgName') orgName: string,
    @Req() request: Request,
  ): Promise<GetOrgUsersListResponse> {
    const token = request.headers['token'];
    return await authClient.fetchAllOrgUsers(orgName, token);
  }
}
