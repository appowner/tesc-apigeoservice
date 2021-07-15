import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { GeofenceDetailsEntity } from './geofence.details.entity';


@Entity({ name: "geofence" })
export class GeofenceEntity {
        

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    name:string;   

    @Column({name : "created_by"})
    createdById:number;   

    @Column({name: "created_date"})
    createdDate:string;

    @Column({name: "updated_by"})
    updatedById:number;

    @Column({name: "updated_date"})
    updatedDate:string;

    @Column({name: "deleted_by"})
    deletedById:number;

    @Column({name: "deleted_date"})
    deletedDate:string;

    @Column({name: "is_deleted"})
    isDeleted:boolean;

    @Column({name: "is_active"})
    isActive:boolean;

    geofenceDetails : GeofenceDetailsEntity[]

    constructor(){        
       
    }
}
