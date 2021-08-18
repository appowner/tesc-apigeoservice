import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommonModule } from './common.module';
import { TestController } from './controller/test/test.controller';
import { AddressService } from './service/address/address.service';
import { LocationService } from './service/location/location.service';
import { RestCallService } from './service/rest-call/rest-call.service';

@Module({
  imports: [CommonModule,
    ConfigModule.forRoot({
      // envFilePath: 'dev.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: Number(configService.get<string>('DATABASE_PORT')),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        autoLoadEntities : true,
        "entities": [
          //  AddressEntity, UserMstEntity
          "src/**/*{.entity.ts}"          
        ],
      })
    }),
    ScheduleModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
