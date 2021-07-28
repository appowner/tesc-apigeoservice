import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { LatlongEntity } from './latLong.entity';


@Entity({ name: "geo_location_cache" })
export class GeoLocationCacheEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name: "address_text"})
    addressText:string;          

    @Column({name: "lat_long_id"})
    latLongId:number;   
    
    latLong:LatlongEntity;    
    
    @Column({name: "created_date"})
    createdDate : Date;

    @Column({name: "updated_date"})
    updatedDate : Date

    constructor(){        
       
    }
}
