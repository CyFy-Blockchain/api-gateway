import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientGrpc } from '@nestjs/microservices';
import { Observable } from 'rxjs';
import { grpcConfig } from '../../../config/gRPC/grpc.config';
import { IAuthService } from '../dto/auth.interface';
import { SignUpDto } from '../dto/auth.dto';

@Injectable()
export class AuthClientService implements OnModuleInit {
  @Client(grpcConfig)
  private client: ClientGrpc;

  private authService: IAuthService;

  /**
   * Initializes the client by retrieving the AuthService from the gRPC client.
   * This method is called when the module is initialized.
   *
   * @memberof AuthClientService
   */
  onModuleInit() {
    this.authService = this.client.getService<IAuthService>('AuthService');
  }

  /**
   * Signs up a new user using the provided data.
   *
   * @param {SignUpDto} data - The data containing the user's information to be signed up.
   * @returns {Observable<boolean>} - An observable that emits a boolean value indicating whether the signup operation was successful.
   */
  signup(data: SignUpDto): Observable<boolean> {
    console.log('🚀 ~ AuthClientService ~ signup ~ signupInput:', data);
    return this.authService.signup(data);
  }
}
