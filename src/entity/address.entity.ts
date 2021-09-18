import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { GeofenceEntity } from './geofence.entity';
import { LatlongEntity } from './latLong.entity';
import { PoiEntity } from './poi.entity';


@Entity({ name: "address" })
export class AddressEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    address1:string;   

    @Column()
    address2:string;   

    @Column()
    city:string;   

    @Column()
    state:string;   

    @Column()
    district:string;   

    @Column()
    pincode:string; 
    
    @Column()
    latitude:string; 

    @Column()
    longitude:string; 

    @Column()
    country:string; 

    
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
