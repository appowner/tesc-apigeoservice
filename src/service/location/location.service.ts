import { Injectable } from '@nestjs/common';
import { GeofenceDetailsEntity } from 'src/entity/geofence.details.entity';
import { GeofenceEntity } from 'src/entity/geofence.entity';
import { LatlongEntity } from 'src/entity/latLong.entity';
import { LocationEntity } from 'src/entity/location.entity';
import { PoiEntity } from 'src/entity/poi.entity';
import { GeofenceDetailsRepository } from 'src/repository/geofence.details.repository';
import { GeofenceRepository } from 'src/repository/geofence.repository';
import { LatlongRepository } from 'src/repository/latlong.repository';
import { LocationRepository } from 'src/repository/location.repository';
import { PoiRepository } from 'src/repository/poi.repository';
import { query, Request } from 'express';

@Injectable()
export class LocationService {

    constructor(private readonly locationRepository: LocationRepository,
        private readonly latlongRepository: LatlongRepository,
        private readonly geofenceRepository: GeofenceRepository,
        private readonly geofenceDetailsRepository: GeofenceDetailsRepository,
        private readonly poiRepository: PoiRepository,) {

    }


    public async createLocation(req: Request, locationEntity: LocationEntity): Promise<LocationEntity> {
        let latLong: LatlongEntity;
        let geofence: GeofenceEntity;
        let poi: PoiEntity;
        if (locationEntity.latLong && !locationEntity.latLong.id) {
            latLong = await this.createLatlong(req, locationEntity.latLong);
            locationEntity.latLongId = latLong.id;
            locationEntity.latLong = latLong;
        }

        if (locationEntity.fence && !locationEntity.fence.id) {
            geofence = await this.createGeofence(req, locationEntity.fence);
            locationEntity.fenceId = geofence.id;
            locationEntity.fence = geofence;
        }

        if (locationEntity.poi && !locationEntity.poi.id) {
            poi = await this.createPoi(req, locationEntity.poi);
            locationEntity.poiId = poi.id;
            locationEntity.poi = poi;
        }

        return this.locationRepository.save(locationEntity);;
    }

    public async updateLocation(req: Request, locationEntity: LocationEntity): Promise<LocationEntity> {
        let latLong: LatlongEntity;
        let geofence: GeofenceEntity;
        let poi: PoiEntity;
        if (locationEntity.latLong && locationEntity.latLongId) {
            locationEntity.latLong.id = locationEntity.latLongId;
            latLong = await this.updateLatlong(req, locationEntity.latLong);
            locationEntity.latLongId = latLong.id;
            locationEntity.latLong = latLong;
        }

        if (locationEntity.fence && locationEntity.fenceId) {
            geofence = await this.updateGeofence(req, locationEntity.fence);
            locationEntity.fenceId = geofence.id;
            locationEntity.fence = geofence;
        }

        if (locationEntity.poi && !locationEntity.poi.id) {
            poi = await this.updatePoi(req, locationEntity.poi);
            locationEntity.poiId = poi.id;
            locationEntity.poi = poi;
        }

        return this.locationRepository.save(locationEntity);;
    }

    public async getLocationById(req: Request, id: number): Promise<LocationEntity> {

        let location: LocationEntity = await this.locationRepository.findOne(id);

        location.latLong = await this.latlongRepository.findOne(location.latLongId);

        location.fence = await this.getGeofence(location.fenceId);

        location.poi = await this.poiRepository.findOne(location.poiId);

        return location;
    }

    public async getGeofence(id: number): Promise<GeofenceEntity> {
        let geoFence: GeofenceEntity = await this.geofenceRepository.findOne(id);

        geoFence.geofenceDetails = await this.geofenceDetailsRepository.find({ geofenceId: id });

        for (let index = 0; index < geoFence.geofenceDetails.length; index++) {
            const element = geoFence.geofenceDetails[index];

            element.latlong = await this.latlongRepository.findOne(element.latlongId);

        }

        return geoFence
    }

    public async createGeofence(req: Request, geofence: GeofenceEntity): Promise<GeofenceEntity> {
        let id = await this.geofenceRepository.query("select nextval('geofence_sequence')");
        let geon = "";

        for (let index = 0; index < geofence.geofenceDetails.length; index++) {
            const element = geofence.geofenceDetails[index];
            geon += element.latlong.long + " " + element.latlong.lat + " , ";
        }
        geon += geofence.geofenceDetails[0].latlong.long + " " + geofence.geofenceDetails[0].latlong.lat;
        let query = this.createGeofenceQuery(id[0].nextval, geofence.name, geofence.createdById, geofence.updatedById ? geofence.updatedById : geofence.createdById, geon);
        console.log(query);
        let res = await this.geofenceRepository.query(query);

        let geo = await this.geofenceRepository.findOne(id[0].nextval);
        let latlong: LatlongEntity;
        for (let index = 0; index < geofence.geofenceDetails.length; index++) {
            const element = geofence.geofenceDetails[index];
            latlong = new LatlongEntity();
            latlong.lat = element.latlong.lat;
            latlong.long = element.latlong.long;
            latlong = await this.createLatlong(null, latlong);
            element.latlongId = latlong.id;
            element.geofenceId = geo.id;
        }

        this.geofenceDetailsRepository.save(geofence.geofenceDetails);

        return geo;
    }

    public async updateGeofence(req: Request, geofence: GeofenceEntity): Promise<GeofenceEntity> {
        let id = geofence.id;
        let geon = "";

        for (let index = 0; index < geofence.geofenceDetails.length; index++) {
            const element = geofence.geofenceDetails[index];
            geon += element.latlong.long + " " + element.latlong.lat + " , ";
        }
        geon += geofence.geofenceDetails[0].latlong.long + " " + geofence.geofenceDetails[0].latlong.lat;
        let query = this.updateGeofenceQuery(id, geofence.name, geofence.updatedById ? geofence.updatedById : geofence.createdById, geon);
        console.log(query);
        let res = await this.geofenceRepository.query(query);

        let geo = await this.geofenceRepository.findOne(id);
        let oldGeodetails = await this.geofenceDetailsRepository.find({ geofenceId: id });
        let oldLatlong = oldGeodetails.map(val => val.latlongId);
        await this.locationRepository.delete(oldLatlong);
        await this.geofenceDetailsRepository.delete(await oldGeodetails.map(val => val.id));

        let latlong: LatlongEntity;
        for (let index = 0; index < geofence.geofenceDetails.length; index++) {
            const element = geofence.geofenceDetails[index];
            latlong = new LatlongEntity();
            latlong.lat = element.latlong.lat;
            latlong.long = element.latlong.long;
            latlong = await this.createLatlong(null, latlong);
            element.latlongId = latlong.id;
            element.geofenceId = geo.id;
        }

        this.geofenceDetailsRepository.save(geofence.geofenceDetails);

        return geo;
    }

    private createGeofenceQuery(id, name, createdBy, updatedBy, geon): string {
        let query = `insert into geofence(id, name, created_by, updated_by, geon) values(${id} , \'${name}\',\'${createdBy}\',\'${updatedBy}\',  ST_GeomFromText('POLYGON((${geon}))'));`;
        return query;
    }

    private updateGeofenceQuery(id, name, updatedBy, geon): string {
        let query = `update geofence set name = \'${name}\', updated_by = \'${updatedBy}\', geon = ST_GeomFromText('POLYGON((${geon}))') where id = ${id};`;
        return query;
    }

    public async getLatlong(req: Request, id: number): Promise<LatlongEntity> {
        return this.latlongRepository.findOne(id);
    }

    public async createLatlong(req: Request, latlongEntity: LatlongEntity): Promise<LatlongEntity> {

        let id = await this.latlongRepository.query("select nextval('latlong_sequence')");
        let query = "INSERT INTO latlong (id, lat, long, point) values(" + id[0].nextval + ", '" + latlongEntity.lat + "', '" + latlongEntity.long + "', ST_MakePoint(" + latlongEntity.long + "," + latlongEntity.lat + ") );"
        let res = await this.latlongRepository.query(query);

        return this.latlongRepository.findOne(id[0].nextval);
    }

    public async updateLatlong(req: Request, latlongEntity: LatlongEntity): Promise<LatlongEntity> {

        let query = `update latlong set lat = \'${latlongEntity.lat}\', long = \'${latlongEntity.long}'\ , point = ST_MakePoint(${latlongEntity.long}, ${latlongEntity.lat})  where id = ${latlongEntity.id};`
        let res = await this.latlongRepository.query(query);

        return this.latlongRepository.findOne(latlongEntity.id);
    }

    public async getPoi(req: Request, id : number): Promise<PoiEntity> {
        let poiEntity: PoiEntity = await this.poiRepository.findOne(id);        

        return poiEntity;
    }
    public async createPoi(req: Request, poiEntity: PoiEntity): Promise<PoiEntity> {

        let id = await this.poiRepository.query("select nextval('poi_sequence')");
        let query = "INSERT INTO poi (id, lat, long, point, poi_provider, display_name, source_provider) values(" + id[0].nextval + ", '" + poiEntity.lat + "', '" + poiEntity.long + "', ST_MakePoint(" + poiEntity.long + "," + poiEntity.lat
            + "), '" + poiEntity.poiProvider + "', '" + poiEntity.displayName + "', '" + poiEntity.sourceProvider + "');"
        let res = await this.poiRepository.query(query);
        return this.poiRepository.findOne(id[0].nextval);
    }

    public async updatePoi(req: Request, poiEntity: PoiEntity): Promise<PoiEntity> {

        let query = `update poi set lat = \'${poiEntity.lat}\', long = \'${poiEntity.long}\', point =  = ST_MakePoint(${poiEntity.long}, ${poiEntity.lat}), poi_provider = \'${poiEntity.poiProvider}\', 
            display_name = \'${poiEntity.displayName}\', source_provider = \'${poiEntity.sourceProvider}\' where id = \'${poiEntity.id}\';`
        let res = await this.poiRepository.query(query);
        return this.poiRepository.findOne(poiEntity.id);
    }




}
