import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiResponse } from '@nestjs/swagger';
import { TokenConversionGuard } from 'src/middleware/guard/tokenConversion.guard';

/* A composite decorator function for token protected routes.
 *
 * @param headerDescription - Description for the token header in Swagger.
 * @param unauthorizedDescription - Description for the unauthorized response in Swagger.
 */
export function SwaggerAuth(
  headerDescription = 'Authentication token for the user',
  unauthorizedDescription = 'Invalid Token',
) {
  return applyDecorators(
    ApiHeader({
      name: 'token',
      description: headerDescription,
      required: true,
    }),
    ApiResponse({
      status: 401,
      description: unauthorizedDescription,
    }),
    UseGuards(TokenConversionGuard),
  );
}
