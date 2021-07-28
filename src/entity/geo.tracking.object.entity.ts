import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';


@Entity({ name: "geo_tracking_object" })
export class GeoTrackingObjectEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "object_type" })
    objectType: string;

    @Column({ name: "object_name" })
    objectName: string;

    @Column({ name: "object_value" })
    objectValue: string;

    constructor() {

    }
}
