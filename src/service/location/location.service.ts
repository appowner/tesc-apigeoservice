import { Injectable, Req } from '@nestjs/common';
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
import { RoadLocationCacheEntity } from 'src/entity/road.location.cache.entity';
import { GeoLocationCacheEntity } from 'src/entity/geo.location.cache.entity';
import { RoadLocationCacheRepository } from 'src/repository/road.location.cache.repositoty';
import { GeoLocationCacheRepository } from 'src/repository/geo.location.cache.repository';
import { GeoLatLongRawEntity } from 'src/entity/geo.lat.long.raw.entity';
import { GeoLatLongRawRepository } from 'src/repository/geo.lat.long.raw.repository';
import { GeoLatLongRepository } from 'src/repository/geo.lat.long.repository';
import { GeoTrackingObjectEntity } from 'src/entity/geo.tracking.object.entity';
import { GeoTrackingObjectRepository } from 'src/repository/geo.tracking.object.repository';
import { Cron, CronExpression } from '@nestjs/schedule';
import { GeoLatLongEntity } from 'src/entity/geo.lat.long.entity';
import { RestCallService } from '../rest-call/rest-call.service';
import { LiveGeoLatLongEntity } from 'src/entity/live.geo.lat.long.entity';
import { LiveGeoLatLongRepository } from 'src/repository/live.geo.lat.long.repository';
import { In } from 'typeorm';

@Injectable()
export class LocationService {


    getLatLongRunning = false;

    constructor(private readonly locationRepository: LocationRepository,
        private readonly latlongRepository: LatlongRepository,
        private readonly geofenceRepository: GeofenceRepository,
        private readonly geofenceDetailsRepository: GeofenceDetailsRepository,
        private readonly poiRepository: PoiRepository,
        private readonly roadLocationCacheRepository: RoadLocationCacheRepository,
        private readonly geoLocationCacheRepository: GeoLocationCacheRepository,
        private readonly geoLatLongRawRepository: GeoLatLongRawRepository,
        private readonly geoLatLongRepository: GeoLatLongRepository,
        private readonly geoTrackingObjectRepository: GeoTrackingObjectRepository,
        private readonly restCallService: RestCallService,
        private readonly liveGeoLatLongRepository : LiveGeoLatLongRepository) {


        this.test()
    }

    public async test() {
        // console.log(await this.findGeoLocationByLatLong(null, {lat : "23.340382" , long : "73.302341"}));
        // console.log(await this.findRoadDistance(null, { fromLat: "23.340382", fromLong: "73.302341", toLat: "23.348057", toLong: "73.206115" }));
    }

    public async allLocation(req: Request): Promise<LocationEntity[]> {
        return this.locationRepository.find();
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

    public async updateLocation(req: Request, locationEntity: LocationEntity): Promise<any> {
        console.log(JSON.stringify(locationEntity));
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

        if (locationEntity.poi && locationEntity.poiId) {
            poi = await this.updatePoi(req, locationEntity.poi);
            locationEntity.poiId = poi.id;
            locationEntity.poi = poi;
        }

        locationEntity.latLong = null;
        locationEntity.poi = null;
        locationEntity.fence = null;

        this.locationRepository.update(locationEntity.id, locationEntity);
        return;
    }

    public async getLocationById(req: Request, id: number): Promise<LocationEntity> {

        let location: LocationEntity = await this.locationRepository.findOne(id);

        location.latLong = await this.latlongRepository.findOne(location.latLongId);

        if (location.fenceId) {
            location.fence = await this.getGeofence(location.fenceId);
        }

        if (location.poiId) {
            location.poi = await this.poiRepository.findOne(location.poiId);
        }

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

    public async allGeofence(req: Request): Promise<GeofenceEntity[]> {
        return this.geofenceRepository.find();
    }

    public async findGeofenceById(req: Request, id: number): Promise<GeofenceEntity> {
        return this.getGeofence(id);
    }

    public async createGeofence(req: Request, geofence: GeofenceEntity): Promise<GeofenceEntity> {
        console.log(JSON.stringify(geofence))
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
        let query = `insert into geofence(id, name, created_by, updated_by, geom) values(${id} , \'${name}\',\'${createdBy}\',\'${updatedBy}\',  ST_GeomFromText('POLYGON((${geon}))'));`;
        return query;
    }

    private updateGeofenceQuery(id, name, updatedBy, geon): string {
        let query = `update geofence set name = \'${name}\', updated_by = \'${updatedBy}\', geom = ST_GeomFromText('POLYGON((${geon}))') where id = ${id};`;
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


    public async allPOI(req: Request): Promise<PoiEntity[]> {

        return this.poiRepository.find();

    }

    public async getPoi(req: Request, id: number): Promise<PoiEntity> {
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

        let query = `update poi set lat = \'${poiEntity.lat}\', long = \'${poiEntity.long}\', point =  ST_MakePoint(${poiEntity.long}, ${poiEntity.lat}), poi_provider = \'${poiEntity.poiProvider}\', 
            display_name = \'${poiEntity.displayName}\', source_provider = \'${poiEntity.sourceProvider}\' where id = \'${poiEntity.id}\';`
        let res = await this.poiRepository.query(query);
        return this.poiRepository.findOne(poiEntity.id);
    }


    public async createRoadLocationCache(req: Request, roadLocationCacheEntity: RoadLocationCacheEntity): Promise<RoadLocationCacheEntity> {
        let latLong: LatlongEntity;

        if (roadLocationCacheEntity.fromLatLong && !roadLocationCacheEntity.fromLatLong.id) {
            latLong = await this.createLatlong(req, roadLocationCacheEntity.fromLatLong);
            roadLocationCacheEntity.fromLatLongId = latLong.id;
            roadLocationCacheEntity.fromLatLong = latLong;
        }

        if (roadLocationCacheEntity.toLatLong && !roadLocationCacheEntity.toLatLong.id) {
            latLong = await this.createLatlong(req, roadLocationCacheEntity.toLatLong);
            roadLocationCacheEntity.toLatLongId = latLong.id;
            roadLocationCacheEntity.toLatLong = latLong;
        }

        return this.roadLocationCacheRepository.save(roadLocationCacheEntity);;
    }

    public async updateRoadLocationCache(req: Request, roadLocation: RoadLocationCacheEntity): Promise<RoadLocationCacheEntity> {
        let latLong: LatlongEntity;

        if (roadLocation.fromLatLong && roadLocation.fromLatLongId) {
            roadLocation.fromLatLong.id = roadLocation.fromLatLongId;
            latLong = await this.updateLatlong(req, roadLocation.fromLatLong);
            roadLocation.fromLatLongId = latLong.id;
            roadLocation.fromLatLong = latLong;
        }

        if (roadLocation.toLatLong && roadLocation.toLatLongId) {
            roadLocation.toLatLong.id = roadLocation.toLatLongId;
            latLong = await this.updateLatlong(req, roadLocation.toLatLong);
            roadLocation.toLatLongId = latLong.id;
            roadLocation.toLatLong = latLong;
        }

        return this.roadLocationCacheRepository.save(roadLocation);;
    }

    public async findRoadDistance(req: Request, body: any): Promise<RoadLocationCacheEntity> {

        let query = `SELECT a.id FROM   latlong  f join  road_location_cache a on a.from_lat_long_id = f.id 
                        join latlong t on t.id = a.to_lat_long_id 
                        where ST_DWithin(f.point, ST_GeomFromText('POINT(${body.fromLong} ${body.fromLat})'), 200)
                        and ST_DWithin(t.point, ST_GeomFromText('POINT(${body.toLong} ${body.toLat})'), 200);`;

        let res = await this.roadLocationCacheRepository.query(query);

        if (res.length > 0 && res[0].id != null) {
            return this.getRoadLocationCacheById(req, res[0].id)
        } else {
            let location: RoadLocationCacheEntity = new RoadLocationCacheEntity();

            location.fromLatLong = new LatlongEntity();
            location.fromLatLong.lat = body.fromLat;
            location.fromLatLong.long = body.fromLong;

            location.toLatLong = new LatlongEntity();
            location.toLatLong.lat = body.toLat;
            location.toLatLong.long = body.toLong;

            let res = await this.restCallService.mapMyIndiaDistanceApi(body.fromLat, body.fromLong, body.toLat, body.toLong)

            if (res && res.distances && res.distances.length > 0 && res.distances[0].length > 0) {
                location.distance = res.distances[0][0];
            } else {
                // postgres function to find disance
            }
            return this.createRoadLocationCache(req, location);
        }


    }

    public async getRoadLocationCacheById(req: Request, id: number): Promise<RoadLocationCacheEntity> {

        let location: RoadLocationCacheEntity = await this.roadLocationCacheRepository.findOne(id);

        location.fromLatLong = await this.latlongRepository.findOne(location.fromLatLongId);
        location.toLatLong = await this.latlongRepository.findOne(location.toLatLongId);

        return location;
    }

    public async findRoadLocationCacheByText(req: Request, text: string): Promise<RoadLocationCacheEntity[]> {

        let query = `lower(text) = '%lower(${text})%'`;
        let locations: RoadLocationCacheEntity[] = await this.roadLocationCacheRepository.find({ where: query });

        for (let index = 0; index < locations.length; index++) {
            const location = locations[index];
            location.fromLatLong = await this.latlongRepository.findOne(location.fromLatLongId);
            location.toLatLong = await this.latlongRepository.findOne(location.toLatLongId);
        }

        return locations;
    }

    public async createGeoLocationCache(req: Request, geoLocationCacheEntity: GeoLocationCacheEntity): Promise<GeoLocationCacheEntity> {
        let latLong: LatlongEntity;

        if (geoLocationCacheEntity.latLong && !geoLocationCacheEntity.latLong.id) {
            latLong = await this.createLatlong(req, geoLocationCacheEntity.latLong);
            geoLocationCacheEntity.latLongId = latLong.id;
            geoLocationCacheEntity.latLong = latLong;
        }

        return this.geoLocationCacheRepository.save(geoLocationCacheEntity);;
    }

    public async updateGeoLocationCache(req: Request, roadLocation: GeoLocationCacheEntity): Promise<GeoLocationCacheEntity> {
        let latLong: LatlongEntity;

        if (roadLocation.latLong && roadLocation.latLongId) {
            roadLocation.latLong.id = roadLocation.latLongId;
            latLong = await this.updateLatlong(req, roadLocation.latLong);
            roadLocation.latLongId = latLong.id;
            roadLocation.latLong = latLong;
        }

        return this.geoLocationCacheRepository.save(roadLocation);;
    }

    public async findGeoLocationByLatLong(req: Request, body: any): Promise<GeoLocationCacheEntity> {


        let query = `SELECT a.id FROM   latlong  b join  geo_location_cache a on a.lat_long_id = b.id where 
            ST_DWithin(b.point, ST_GeomFromText('POINT(${body.long} ${body.lat})'), 100) 
                order by ST_Distance(b.point ,ST_GeomFromText('POINT(${body.long} ${body.lat})'));`;

        let res = await this.geoLocationCacheRepository.query(query);

        if (res.length > 0 && res[0].id != null) {
            return await this.getGeoLocationCacheById(req, res[0].id);
        } else {
            let temp = await this.restCallService.mapMyIndiaReverseGeoCoding(body.lat, body.long);
            let location: GeoLocationCacheEntity = new GeoLocationCacheEntity();
            location.addressText = temp[0].formatted_address;
            location.latLong = new LatlongEntity();
            location.latLong.lat = body.lat;
            location.latLong.long = body.long;
            return await this.createGeoLocationCache(req, location);;
        }

    }

    public async getGeoLocationCacheById(req: Request, id: number): Promise<GeoLocationCacheEntity> {

        let location: GeoLocationCacheEntity = await this.geoLocationCacheRepository.findOne(id);

        location.latLong = await this.latlongRepository.findOne(location.latLongId);

        return location;
    }

    public async findGeoLocationCacheByText(req: Request, text: string): Promise<GeoLocationCacheEntity[]> {

        let query = `lower(address_text) like '%${text.toLocaleLowerCase()}%'`;
        console.log("query" + query);
        let locations: GeoLocationCacheEntity[] = await this.geoLocationCacheRepository.find({ where: query });

        for (let index = 0; index < locations.length; index++) {
            const location = locations[index];
            location.latLong = await this.latlongRepository.findOne(location.latLongId);
        }

        return locations;
    }

    public async addGeoLatLongRaw(req: Request, data: string): Promise<any> {
        let raw = new GeoLatLongRawEntity();
        raw.latLongRecord = data;
        raw.isProcessed = false;
        await this.geoLatLongRawRepository.save(raw);
        return "sucess";
    }

    public async createGeoTrackingObject(req: Request, geoTrackingObjectEntity: GeoTrackingObjectEntity): Promise<GeoTrackingObjectEntity> {
        return this.geoTrackingObjectRepository.save(geoTrackingObjectEntity);
    }

    public async updateGeoTrackingObject(req: Request, geoTrackingObjectEntity: GeoTrackingObjectEntity): Promise<GeoTrackingObjectEntity> {
        return this.geoTrackingObjectRepository.save(geoTrackingObjectEntity);
    }

    public async allGeoTrackingObject(req: Request): Promise<GeoTrackingObjectEntity[]> {
        return this.geoTrackingObjectRepository.find();
    }

    public async getGeoTrackingObjectById(req: Request, id: number): Promise<GeoTrackingObjectEntity> {
        return this.geoTrackingObjectRepository.findOne(id);
    }

    public async getGeoLatLongById(req: Request, id: number) {
        return this.geoLatLongRepository.findOne(id);
    }

    public async createGeoLatlong(latlongEntity: GeoLatLongEntity): Promise<GeoLatLongEntity> {

        let id = await this.latlongRepository.query("select nextval('geo_latlong_sequence')");
        let query = "INSERT INTO geo_latlong (id, geo_tracking_object_id, recorded_date, lat, long, point) " +
            "values(" + id[0].nextval + ", '" + latlongEntity.geoTrackingObjectId + "' , now()" + ", '" + latlongEntity.lat + "', '" + latlongEntity.long + "', ST_MakePoint(" + latlongEntity.long + "," + latlongEntity.lat + ") );"
        let res = await this.latlongRepository.query(query);

        return this.geoLatLongRepository.findOne(id[0].nextval);
    }


    public async createLiveGeoLatlong(latlongEntity: GeoLatLongEntity) {

        let live: LiveGeoLatLongEntity = await this.liveGeoLatLongRepository.findOne({where : {geoTrackingObjectId : latlongEntity.geoTrackingObjectId}});
        if(live == null){            
            live = new LiveGeoLatLongEntity();
            live.geoTrackingObjectId = latlongEntity.geoTrackingObjectId;
            live.lat = latlongEntity.lat;
            live.long = latlongEntity.long;
            live.recordedDate = latlongEntity.recordedDate;        
    
            this.liveGeoLatLongRepository.save(live);
        }else{
            
            live.lat = latlongEntity.lat;
            live.long = latlongEntity.long;
            live.recordedDate = latlongEntity.recordedDate;        
    
            this.liveGeoLatLongRepository.update(live.id, live);
        }
        
    }

    public async allTripLiveLocation(req: Request): Promise<LiveGeoLatLongEntity[]> {
        let trips = await this.restCallService.liveTrips(req);

        if(trips.length == 0){
            return [];
        }

        let driverIds =  trips.map(val => val.driverId);

        if(driverIds.length == 0){
            return [];
        }

        let drivers = await this.restCallService.findDriverByIds(req, driverIds);

        if(drivers.length == 0) {
            return [];
        }

        let temp = await this.geoTrackingObjectRepository.find({where : { objectType : 'sim', objectValue : In(drivers.map(val => val.contactNumber)) }});

        if(temp.length == 0){
            return [];
        }

        return await this.liveGeoLatLongRepository.find({where : {geoTrackingObjectId: In(temp.map(val => val.id))}});

    }

    public async tripLiveLocation(req: Request, id: number): Promise<LiveGeoLatLongEntity> {
        let trips = await this.restCallService.findTripById(req, id);
        
        let driver = await this.restCallService.findDriverById(req, trips.driverId);

        let temp = await this.geoTrackingObjectRepository.find({where : { objectType : 'sim', objectValue : driver.contactNumber }});

        return await this.liveGeoLatLongRepository.findOne({where : {geoTrackingObjectId: In(temp.map(val => val.id))}});

    }



    @Cron(CronExpression.EVERY_30_SECONDS)
    async uploadData() {

        if (!this.getLatLongRunning) {
            this.getLatLongRunning = true;
        }

        let geo: GeoLatLongEntity;
        let json: any;
        try {
            let data = await this.geoLatLongRawRepository.find({ where: " is_processed = false order by id" });
            if (data.length > 0) {
                for (let d = 0; d < data.length; d++) {
                    const raw = data[d];
                    try {
                        json = JSON.parse(raw.latLongRecord);
                        geo = new GeoLatLongEntity();
                        geo.lat = json.lat;
                        geo.long = json.long;
                        geo.geoTrackingObjectId = json.trackingId;
                        geo.recordedDate = raw.createdDate;
                        await this.createGeoLatlong(geo);
                        await this.createLiveGeoLatlong(geo);
                        // await this.geoLatLongRepository.save(geo);
                        raw.isValid = true;
                        raw.isProcessed = true;
                        await this.geoLatLongRawRepository.update(raw.id, raw);

                    } catch (error) {
                        raw.isValid = false;
                        raw.isProcessed = true;
                        await this.geoLatLongRawRepository.update(raw.id, raw);
                    }
                }
            }
            this.getLatLongRunning = false;
        } catch (error) {
            this.getLatLongRunning = false;
        }
    }

    

}
