import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { LatlongEntity } from './latLong.entity';
import { PoiEntity } from './poi.entity';
import { GeofenceEntity } from './geofence.entity';


@Entity({ name: "location" })
export class LocationEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name: "location_name"})
    locationName:string;   

    @Column({name : "state_name"})
    stateName:string;   

    @Column({name: "lat_long_id"})
    latLongId:number;   
    
    latLong:LatlongEntity;

    @Column({name : "poi_id"})
    poiId:number;   
    
    poi:PoiEntity;   

    @Column({name : "fence_id"})
    fenceId:number;   

    fence : GeofenceEntity

    constructor(){        
       
    }
}
