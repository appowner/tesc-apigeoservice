import { Controller, Get, Query, Post, Req, Body, UseFilters, UseGuards, Delete } from '@nestjs/common';
import { ResponseObject } from 'src/model/response-object';
import { BusinessError } from 'src/model/business-error';
import { Constants } from 'src/model/constants';
import { CustomGLobalExceptionHandler } from 'src/CustomGLobalExceptionHandler';
import { CitiesService } from 'src/service/customer/cities.service';
import { CitiesEntity } from 'src/entity/cities.entity';
import { AddressEntity } from 'src/entity/address.entity';
import { AddressService } from 'src/service/address/address.service';
import { query, Request } from 'express';
import { LocationEntity } from 'src/entity/location.entity';
import { LocationService } from 'src/service/location/location.service';
import { GeofenceEntity } from 'src/entity/geofence.entity';
import { PoiEntity } from 'src/entity/poi.entity';
import { RoadLocationCacheRepository } from 'src/repository/road.location.cache.repositoty';
import { RoadLocationCacheEntity } from 'src/entity/road.location.cache.entity';
import { GeoLocationCacheEntity } from 'src/entity/geo.location.cache.entity';
import { GeoTrackingObjectEntity } from 'src/entity/geo.tracking.object.entity';

@Controller('location')
@UseFilters(new CustomGLobalExceptionHandler())
export class LocationController {

  constructor(private citiesService: CitiesService, private addressService: AddressService, private locationService : LocationService) { }

  @Get("/all")
  // // @UseGuards(JwtAuthGuard)
  async findAll(): Promise<ResponseObject<CitiesEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<CitiesEntity[]> = new ResponseObject(be, await this.citiesService.findAll())
    return ro;
  }

  @Get("/allState")
  // // @UseGuards(JwtAuthGuard)
  async findAllState(): Promise<ResponseObject<any>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<any> = new ResponseObject(be, await this.citiesService.findAllState())
    return ro;
  }

  @Get("/findCity")
  // // @UseGuards(JwtAuthGuard)
  async findCityByState(@Query('state') state: string): Promise<ResponseObject<CitiesEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<CitiesEntity[]> = new ResponseObject(be, await this.citiesService.findCityByState(state))
    return ro;
  }


  @Get("/findAddressById")
  // // @UseGuards(JwtAuthGuard)
  async findAddressById(@Query('id') id: number): Promise<ResponseObject<AddressEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<AddressEntity> = new ResponseObject(be, await this.addressService.findById(id));
    return ro;
  }

  @Post("/findAddressByIds")
  // // @UseGuards(JwtAuthGuard)
  async findAddressByIds(@Body('ids') ids: number[]): Promise<ResponseObject<AddressEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<AddressEntity[]> = new ResponseObject(be, await this.addressService.findByIds(ids));
    return ro;
  }


  @Post("/createAddress")
  // // @UseGuards(JwtAuthGuard)
  async createAddress(@Body() addressEntity: AddressEntity): Promise<ResponseObject<AddressEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<AddressEntity> = new ResponseObject(be, await this.addressService.create(addressEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Get("/allLocation")
  // // @UseGuards(JwtAuthGuard)
  async allLocation(@Req() req: Request): Promise<ResponseObject<LocationEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<LocationEntity[]> = new ResponseObject(be, await this.locationService.allLocation(req))
    return ro;
  }

  @Get("/findLocationById")
  // // @UseGuards(JwtAuthGuard)
  async findLocationById(@Req() req: Request, @Query('id') id: number): Promise<ResponseObject<LocationEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<LocationEntity> = new ResponseObject(be, await this.locationService.getLocationById(req, id))
    return ro;
  }

  @Post("/createLocation")
  // // @UseGuards(JwtAuthGuard)
  async createLocation(@Req() req: Request,  @Body() locationEntity: LocationEntity): Promise<ResponseObject<LocationEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<LocationEntity> = new ResponseObject(be, await this.locationService.createLocation(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/udpateLocation")
  // // @UseGuards(JwtAuthGuard)
  async udpateLocation(@Req() req: Request,  @Body() locationEntity: LocationEntity): Promise<ResponseObject<LocationEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<LocationEntity> = new ResponseObject(be, await this.locationService.updateLocation(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Get("/allGeofence")
  // // @UseGuards(JwtAuthGuard)
  async allGeofence(@Req() req: Request): Promise<ResponseObject<GeofenceEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeofenceEntity[]> = new ResponseObject(be, await this.locationService.allGeofence(req))
    return ro;
  }

  @Get("/findGeofenceById")
  // // @UseGuards(JwtAuthGuard)
  async findGeofenceById(@Req() req: Request, @Query('id') id: number): Promise<ResponseObject<GeofenceEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeofenceEntity> = new ResponseObject(be, await this.locationService.findGeofenceById(req, id))
    return ro;
  }

  @Post("/createGeofence")
  // // @UseGuards(JwtAuthGuard)
  async createGeofence(@Req() req: Request,  @Body() geofenceEntity: GeofenceEntity): Promise<ResponseObject<GeofenceEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeofenceEntity> = new ResponseObject(be, await this.locationService.createGeofence(req, geofenceEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/udpateGeofence")
  // // @UseGuards(JwtAuthGuard)
  async udpateGeofence(@Req() req: Request,  @Body() geofenceEntity: GeofenceEntity): Promise<ResponseObject<GeofenceEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeofenceEntity> = new ResponseObject(be, await this.locationService.updateGeofence(req, geofenceEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Get("/allPoi")
  // // @UseGuards(JwtAuthGuard)
  async allPoi(@Req() req: Request): Promise<ResponseObject<PoiEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<PoiEntity[]> = new ResponseObject(be, await this.locationService.allPOI(req))
    return ro;
  }

  @Get("/findPoiById")
  // // @UseGuards(JwtAuthGuard)
  async findPoiById(@Req() req: Request, @Query('id') id: number): Promise<ResponseObject<PoiEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<PoiEntity> = new ResponseObject(be, await this.locationService.getPoi(req, id))
    return ro;
  }

  @Post("/createPoi")
  // // @UseGuards(JwtAuthGuard)
  async createPoi(@Req() req: Request,  @Body() poiEntity: PoiEntity): Promise<ResponseObject<PoiEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<PoiEntity> = new ResponseObject(be, await this.locationService.createPoi(req, poiEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/udpatePoi")
  // // @UseGuards(JwtAuthGuard)
  async udpatePoi(@Req() req: Request,  @Body() poiEntity: PoiEntity): Promise<ResponseObject<PoiEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<PoiEntity> = new ResponseObject(be, await this.locationService.updatePoi(req, poiEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/updateAddress")
  // // @UseGuards(JwtAuthGuard)
  async updateAddress(@Body() addressEntity: AddressEntity): Promise<ResponseObject<AddressEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<AddressEntity> = new ResponseObject(be, await this.addressService.update(addressEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Get("/getRoadLocationCacheById")
  // // @UseGuards(JwtAuthGuard)
  async getRoadLocationCacheById(@Query('id') id: number, @Req() req: Request,): Promise<ResponseObject<RoadLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<RoadLocationCacheEntity> = new ResponseObject(be, await this.locationService.getRoadLocationCacheById(req, id));
    return ro;
  }

  @Get("/findRoadDistance")
  // // @UseGuards(JwtAuthGuard)
  async findRoadDistance(@Body() body: any, @Req() req: Request,): Promise<ResponseObject<RoadLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<RoadLocationCacheEntity> = new ResponseObject(be, await this.locationService.findRoadDistance(req, body));
    return ro;
  }

  @Get("/findRoadLocationCacheByText")
  // // @UseGuards(JwtAuthGuard)
  async findRoadLocationCacheByText(@Query('text') text: string, @Req() req: Request,): Promise<ResponseObject<RoadLocationCacheEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<RoadLocationCacheEntity[]> = new ResponseObject(be, await this.locationService.findRoadLocationCacheByText(req, text));
    return ro;
  }


  @Post("/createRoadLocationCache")
  // // @UseGuards(JwtAuthGuard)
  async createRoadLocationCache(@Req() req: Request,  @Body() locationEntity: RoadLocationCacheEntity): Promise<ResponseObject<RoadLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<RoadLocationCacheEntity> = new ResponseObject(be, await this.locationService.createRoadLocationCache(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/udpateRoadLocationCache")
  // // @UseGuards(JwtAuthGuard)
  async udpateRoadLocationCache(@Req() req: Request,  @Body() locationEntity: RoadLocationCacheEntity): Promise<ResponseObject<RoadLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<RoadLocationCacheEntity> = new ResponseObject(be, await this.locationService.updateRoadLocationCache(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Get("/getGeoLocationCacheById")
  // // @UseGuards(JwtAuthGuard)
  async getGeoLocationCacheById(@Query('id') id: number, @Req() req: Request,): Promise<ResponseObject<GeoLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoLocationCacheEntity> = new ResponseObject(be, await this.locationService.getGeoLocationCacheById(req, id));
    return ro;
  }
  @Get("/findGeoLocationByLatLong")
  // // @UseGuards(JwtAuthGuard)
  async findGeoLocationByLatLong(@Body() body: any, @Req() req: Request,): Promise<ResponseObject<GeoLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoLocationCacheEntity> = new ResponseObject(be, await this.locationService.findGeoLocationByLatLong(req, body));
    return ro;
  }


  @Get("/findGeoLocationCacheByText")
  // // @UseGuards(JwtAuthGuard)
  async findGeoLocationCacheByText(@Query('text') text: string, @Req() req: Request,): Promise<ResponseObject<GeoLocationCacheEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoLocationCacheEntity[]> = new ResponseObject(be, await this.locationService.findGeoLocationCacheByText(req, text));
    return ro;
  }


  @Post("/createGeoLocationCache")
  // // @UseGuards(JwtAuthGuard)
  async createGeoLocationCache(@Req() req: Request,  @Body() locationEntity: GeoLocationCacheEntity): Promise<ResponseObject<GeoLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoLocationCacheEntity> = new ResponseObject(be, await this.locationService.createGeoLocationCache(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/updateGeoLocationCache")
  // // @UseGuards(JwtAuthGuard)
  async updateGeoLocationCache(@Req() req: Request,  @Body() locationEntity: GeoLocationCacheEntity): Promise<ResponseObject<GeoLocationCacheEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoLocationCacheEntity> = new ResponseObject(be, await this.locationService.updateGeoLocationCache(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/addGeoLatLongRaw")
  // // @UseGuards(JwtAuthGuard)
  async addGeoLatLongRaw(@Req() req: Request,  @Body() data: any): Promise<ResponseObject<any>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<any> = new ResponseObject(be, await this.locationService.addGeoLatLongRaw(req, data));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/createGeoTrackingObject")
  // // @UseGuards(JwtAuthGuard)
  async createGeoTrackingObject(@Req() req: Request,  @Body() locationEntity: GeoTrackingObjectEntity): Promise<ResponseObject<GeoTrackingObjectEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoTrackingObjectEntity> = new ResponseObject(be, await this.locationService.createGeoTrackingObject(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Post("/updateGeoTrackingObject")
  // // @UseGuards(JwtAuthGuard)
  async updateGeoTrackingObject(@Req() req: Request,  @Body() locationEntity: GeoTrackingObjectEntity): Promise<ResponseObject<GeoTrackingObjectEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoTrackingObjectEntity> = new ResponseObject(be, await this.locationService.updateGeoTrackingObject(req, locationEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

  @Get("/findAllGeoTrackingObject")
  // // @UseGuards(JwtAuthGuard)
  async allGeoTrackingObject( @Req() req: Request,): Promise<ResponseObject<GeoTrackingObjectEntity[]>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoTrackingObjectEntity[]> = new ResponseObject(be, await this.locationService.allGeoTrackingObject(req));
    return ro;
  }

  @Get("/findAllGeoTrackingObject")
  // // @UseGuards(JwtAuthGuard)
  async findGeoTrackingObjectById(@Query('id') id: number, @Req() req: Request,): Promise<ResponseObject<GeoTrackingObjectEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<GeoTrackingObjectEntity> = new ResponseObject(be, await this.locationService.getGeoTrackingObjectById(req, id));
    return ro;
  }

}
