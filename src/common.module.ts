import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationController } from './controller/location/location.controller';
import { CitiesEntity } from './entity/cities.entity';
import { jwtConstants } from './model/constants';
import { CitiesRepository } from './repository/cities-repository';
import { CitiesService } from './service/customer/cities.service';
import { AddressService } from './service/address/address.service';
import { AddresRepository } from './repository/address.repository';



@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
          }), 
        TypeOrmModule.forFeature([CitiesEntity,CitiesRepository, AddresRepository]),
    ],
    controllers: [LocationController],
    providers: [CitiesService, AddressService]
})
export class CommonModule { }
