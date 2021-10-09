import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { GeoTrackingObjectEntity } from './geo.tracking.object.entity';


@Entity({ name: "live_geo_latlong" })
export class LiveGeoLatLongEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name : "geo_tracking_object_id"})
    geoTrackingObjectId:number;   

    geoTrackingObject : GeoTrackingObjectEntity;

    @Column()
    lat:string;   

    @Column()
    long:string;   

    @Column({name: "created_date"})
    createdDate:Date;

    @Column({name: "recorded_date"})
    recordedDate:Date;
    

    constructor(){        
       
    }
}
