import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { LatlongEntity } from './latLong.entity';


@Entity({ name: "road_location_cache" })
export class RoadLocationCacheEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name: "text"})
    text:string;          

    @Column({name: "from_lat_long_id"})
    fromLatLongId:number;   
    
    fromLatLong:LatlongEntity;

    @Column({name: "to_lat_long_id"})
    toLatLongId:number;   
    
    toLatLong:LatlongEntity;
    
    @Column({name: "created_date"})
    createdDate : Date;

    @Column({name: "updated_date"})
    updatedDate : Date

    constructor(){        
       
    }
}
