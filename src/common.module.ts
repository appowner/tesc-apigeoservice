import { HttpModule, Module } from '@nestjs/common';
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
import { RoadLocationCacheEntity } from './entity/road.location.cache.entity';
import { GeoLocationCacheEntity } from './entity/geo.location.cache.entity';
import { RoadLocationCacheRepository } from './repository/road.location.cache.repositoty';
import { GeoLocationCacheRepository } from './repository/geo.location.cache.repository';
import { GeoLatLongRawRepository } from './repository/geo.lat.long.raw.repository';
import { GeoLatLongRepository } from './repository/geo.lat.long.repository';
import { GeoTrackingObjectRepository } from './repository/geo.tracking.object.repository';
import { RestCallService } from './service/rest-call/rest-call.service';
import { LiveGeoLatLongRepository } from './repository/live.geo.lat.long.repository';



@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: jwtConstants.secret,
            signOptions: { expiresIn: '60m' },
        }),
        TypeOrmModule.forFeature([CitiesEntity, LatlongEntity, CitiesRepository, AddresRepository, GeofenceRepository,
            GeofenceDetailsRepository, LatlongRepository, LocationRepository, PoiRepository,
            RoadLocationCacheRepository, GeoLocationCacheRepository, GeoLatLongRawRepository, GeoLatLongRepository,
            GeoTrackingObjectRepository, LiveGeoLatLongRepository]),
        HttpModule
    ],
    controllers: [LocationController],
    providers: [CitiesService, AddressService, LocationService, RestCallService]
})
export class CommonModule { }
