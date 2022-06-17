import { join } from 'path';
import { ConfigService } from '@nestjs/config';
import { Global, Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthController } from './auth.controller';
import { AUTH_SERVICE_NAME, AUTH_PACKAGE_NAME } from './auth.pb';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE_NAME,
        useFactory: (config: ConfigService) => ({
          transport: Transport.GRPC,
          options: {
            url: config.get<string>('AUTH_SVC_URL'),
            package: AUTH_PACKAGE_NAME,
            protoPath: join(config.get<string>('AUTH_SVC_PROTO_PATH')),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
