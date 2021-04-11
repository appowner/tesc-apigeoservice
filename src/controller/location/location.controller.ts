import { Controller, Get, Query, Post, Req, Body, UseFilters, UseGuards, Delete } from '@nestjs/common';
import { ResponseObject } from 'src/model/response-object';
import { BusinessError } from 'src/model/business-error';
import { Constants } from 'src/model/constants';
import { CustomGLobalExceptionHandler } from 'src/CustomGLobalExceptionHandler';
import { CitiesService } from 'src/service/customer/cities.service';
import { CitiesEntity } from 'src/entity/cities.entity';

@Controller('location')
@UseFilters(new CustomGLobalExceptionHandler())
export class LocationController {

    constructor(private citiesService : CitiesService){}

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
      let ro: ResponseObject<any> = new ResponseObject(be, JSON.stringify(await this.citiesService.findAllState()))
      return ro;
    }

    @Get("/findCity")
    // // @UseGuards(JwtAuthGuard)
    async findCityByState(@Query('state') state: string): Promise<ResponseObject<CitiesEntity[]>> {
      let be: BusinessError = new BusinessError(Constants.SUCCESS_CODE, Constants.SUCCESS_RES);
      let ro: ResponseObject<CitiesEntity[]> = new ResponseObject(be, await this.citiesService.findCityByState(state))
      return ro;
    }

}
