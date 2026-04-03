import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/user.module';
import { ResetPasswordModule } from './reset-password/resetpassword.module';


@Module({
  imports: [
    // ENV CONFIG
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // DATABASE CONFIG
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port:  Number(config.get<string>('DB_PORT')),
        username: config.get<string>('DB_USER'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true, // ❗ true only for development

      })
    }),
    // USER MODULE
   UsersModule,
    AuthModule,
    ResetPasswordModule
   
  
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
