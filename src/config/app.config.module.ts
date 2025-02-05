import { NestConfigModule } from './nest.config.module';
import {
  DynamicModule,
  ForwardReference,
  MiddlewareConsumer,
  Module,
  NestModule,
  Type,
} from '@nestjs/common';
import { ServerHealthCheckModule } from 'src/modules/server-health-check/server-health-check.module';
import { RouterModule } from '@nestjs/core';
import { AuthModule } from 'src/modules/auth/auth.module';
import { LoggerMiddleware } from 'src/middleware/logger/logger.middleware';
import { ResultsModule } from 'src/modules/results/results.module';

type NestModuleType =
  | Type<any>
  | DynamicModule
  | Promise<DynamicModule>
  | ForwardReference;

function getModuleWithPath(
  path: string,
  module: NestModuleType,
): Array<NestModuleType> {
  return [
    module,
    RouterModule.register([
      {
        path,
        module: module as Type<any>,
      },
    ]),
  ];
}

@Module({
  imports: [
    NestConfigModule,
    // TypeOrmModule.forRoot(databaseConfig), // Uncomment this line to enable TypeORM
    ...getModuleWithPath('server-health-check', ServerHealthCheckModule),
    ...getModuleWithPath('auth', AuthModule),
    ...getModuleWithPath('results', ResultsModule),
  ],
})
export class AppConfigModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
