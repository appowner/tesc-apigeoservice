import { HttpService, Injectable } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { TripEntity } from 'src/entity/trip.entity';
import { ResponseObject } from 'src/model/response-object';
import { Request } from 'express';
import { DriverEntity } from 'src/entity/Driver.entity';

@Injectable()
export class RestCallService {

    constructor(private httpService: HttpService) {
        this.check();
    }

    async check() {
        // let res = await this.getMapMyIndiaToken();
        // console.log(res)
        // console.log(res.data.access_token);

        // let reverseGeoCoding = await this.mapMyIndiaReverseGeoCoding("22.987232", "72.471104");
        // console.log(reverseGeoCoding);

        // let geoCoding = await this.geoCoding({ address: "applewood township" });
        // console.log(geoCoding);
        
        // let distance = await this.mapMyIndiaDistanceApi("72.471104","22.987232","72.542797","23.136400");
        // console.log(distance);
    }

    async getMapMyIndiaToken(): Promise<any> {
        let res = await this.httpService.axiosRef.post<any>(process.env.MAP_MY_INDIA_AUTH_URL, new URLSearchParams({
            grant_type: 'client_credentials', //gave the values directly for testing
            client_id: process.env.MAP_MY_INDIA_CLIENT_ID,
            client_secret: process.env.MAP_MY_INDIA_CLIENT_SECRET
        }))
        console.log("map my india token--:" + res.data.access_token);
        return res.data.access_token;
    }

    async mapMyIndiaReverseGeoCoding(lat: string, long: string): Promise<any> {
        let url = process.env.MAP_MY_INDIA_API_URL + (await this.getMapMyIndiaToken()) +
            '/rev_geocode?lat=' + lat + "&lng=" + long;
        console.log("url-:" + url);
        let res: AxiosResponse<any> = await this.httpService.get<any>(url
        ).toPromise();
        return res.data && res.data.results ? res.data.results : [];
    }

    async mapMyIndiaGeoCoding(body): Promise<any> {
        let token = await this.getMapMyIndiaToken();
        const params = new URLSearchParams();
        params.append('address', body.address);

        let url = process.env.MAP_MY_INDIA_GEO_URL + 'geocode';
        console.log("url-:" + url);
        let res: AxiosResponse<any> = await this.httpService.get<any>(url
            , { params: params, headers: { 'authorization': token } }).toPromise();
        return res.data;
    }

    async mapMyIndiaDistanceApi(lat: string, long: string, lat1: string, long1: string): Promise<any> {
        let url = process.env.MAP_MY_INDIA_API_URL + (await this.getMapMyIndiaToken()) +
            `/distance_matrix/trucking/${long},${lat};${long1},${lat1}?sources=0&destinations=1&region=IND` ;
        console.log("url-:" + url);
        let res: AxiosResponse<any> = await this.httpService.get<any>(url
        ).toPromise();
        return res.data && res.data.results ? res.data.results : [];
    }

    async findTripById(req: Request, id: number): Promise<TripEntity> {
        let res: AxiosResponse<ResponseObject<TripEntity>> = await this.httpService.get<ResponseObject<TripEntity>>(process.env.ROUTER_URL
            + 'order/findTrip?id=' + id
            , { headers: this.getHeaders(req) }).toPromise();
        return res.data.res;
    }

    async liveTrips(req: Request): Promise<TripEntity[]> {
        let res: AxiosResponse<ResponseObject<TripEntity[]>> = await this.httpService.post<ResponseObject<TripEntity[]>>(process.env.ROUTER_URL + 'order/tripLiveFilter',
            { }, { headers: this.getHeaders(req) }).toPromise();
        return res.data.res;
    }

    async findDriverById(req: Request, id: number): Promise<DriverEntity> {
        let res: AxiosResponse<ResponseObject<DriverEntity>> = await this.httpService.get<ResponseObject<DriverEntity>>(process.env.ROUTER_URL
            + 'driver/find?id=' + id
            , { headers: this.getHeaders(req) }).toPromise();
        return res.data.res;
    }

    async findDriverByIds(req: Request, ids: number[]): Promise<DriverEntity[]> {
        let res: AxiosResponse<ResponseObject<DriverEntity[]>> = await this.httpService.post<ResponseObject<DriverEntity[]>>(process.env.ROUTER_URL
            + 'driver/findByIds',
            { ids: ids }, { headers: this.getHeaders(req) }).toPromise();
        return res.data.res;
    }

    getHeaders(req: Request) {
        return { 'authorization': req.headers['authorization'] ? req.headers['authorization'] : "", 'guid': req.headers['guid'] ? req.headers['guid'] : "" };
    }
}
