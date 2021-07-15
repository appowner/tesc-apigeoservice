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

}
