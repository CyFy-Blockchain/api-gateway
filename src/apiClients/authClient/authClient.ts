import axios, { AxiosInstance } from 'axios';
import { envVar } from 'src/config/env/default';
import { getHeaderAuthToken, translateAxiosError } from '../helper';
import {
  GetOrgUsersListResponse,
  RegisterUserRequest,
  RegisterUserResponse,
  SigninUserRequest,
  SigninUserResponse,
} from 'src/modules/auth/dto/auth.dto';

const { auth } = envVar;

class AuthClient {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: auth.gatewayBaseUrl,
      timeout: 5000, // 5 seconds timeout
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async signin(credentials: SigninUserRequest): Promise<SigninUserResponse> {
    try {
      const { orgName, username, password } = credentials;
      const response = await this.axiosInstance.post<SigninUserResponse>(
        '/api/v1/users/signin',
        { orgName, username, password },
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async registerUser(
    body: RegisterUserRequest,
    token: string,
  ): Promise<RegisterUserResponse> {
    try {
      const response = await this.axiosInstance.post<RegisterUserResponse>(
        '/api/v1/admins/register',
        body,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async fetchAllOrgUsers(
    orgName: string,
    token: string,
  ): Promise<GetOrgUsersListResponse> {
    try {
      const response = await this.axiosInstance.get<GetOrgUsersListResponse>(
        `/api/v1/users/organization/${orgName}`,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }

  async fetchFabricUuid(token: string): Promise<{ fabricToken: string }> {
    try {
      const response = await this.axiosInstance.get<{ fabricToken: string }>(
        `/api/v1/users/fabric-token`,
        getHeaderAuthToken(token),
      );
      return response.data;
    } catch (err) {
      translateAxiosError(err);
    }
  }
}

export const authClient = new AuthClient();
