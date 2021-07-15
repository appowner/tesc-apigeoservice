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
import { GeofenceDetailsRepository } from './repository/geofence.details.repository';
import { GeofenceRepository } from './repository/geofence.repository';
import { LatlongRepository } from './repository/latlong.repository';
import { LocationRepository } from './repository/location.repository';
import { PoiRepository } from './repository/poi.repository';
import { LocationService } from './service/location/location.service';
import { LatlongEntity } from './entity/latLong.entity';



@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
          }), 
        TypeOrmModule.forFeature([CitiesEntity, LatlongEntity,CitiesRepository, AddresRepository, GeofenceRepository, GeofenceDetailsRepository, LatlongRepository, LocationRepository, PoiRepository]),
    ],
    controllers: [LocationController],
    providers: [CitiesService, AddressService, LocationService]
})
export class CommonModule { }
