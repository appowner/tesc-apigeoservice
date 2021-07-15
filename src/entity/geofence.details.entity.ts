import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { LatlongEntity } from './latLong.entity';


@Entity({ name: "geofence_details" })
export class GeofenceDetailsEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column({name: "lat_long_id"})
    latlongId:number;   

    @Column({name : "geofence_id"})
    geofenceId:number;   

    latlong : LatlongEntity;

    constructor(){        
       
    }
}
