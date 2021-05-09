import { Controller, Get, Query, Post, Req, Body, UseFilters, UseGuards, Delete } from '@nestjs/common';
import { ResponseObject } from 'src/model/response-object';
import { BusinessError } from 'src/model/business-error';
import { Constants } from 'src/model/constants';
import { CustomGLobalExceptionHandler } from 'src/CustomGLobalExceptionHandler';
import { CitiesService } from 'src/service/customer/cities.service';
import { CitiesEntity } from 'src/entity/cities.entity';
import { AddressEntity } from 'src/entity/address.entity';
import { AddressService } from 'src/service/address/address.service';

@Controller('location')
@UseFilters(new CustomGLobalExceptionHandler())
export class LocationController {

  constructor(private citiesService: CitiesService, private addressService: AddressService) { }

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

  @Post("/updateAddress")
  // // @UseGuards(JwtAuthGuard)
  async updateAddress(@Body() addressEntity: AddressEntity): Promise<ResponseObject<AddressEntity>> {
    let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
    let ro: ResponseObject<AddressEntity> = new ResponseObject(be, await this.addressService.update(addressEntity));
    console.log(JSON.stringify(ro));
    return ro;
  }

}
