import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { authClient } from 'src/apiClients/authClient/authClient';

@Injectable()
export class TokenConversionGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers['token'];

    const fabricToken = await authClient.fetchFabricUuid(token);

    // Attach fabricToken to the request object
    request.headers['fabricToken'] = fabricToken?.fabricToken;

    return true;
  }
}
