import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';


@Entity({ name: "geo_latlong_raw" })
export class GeoLatLongRawEntity {

    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: "lat_long_record" })
    latLongRecord: string

    @Column({ name: "is_valid" })
    isValid: boolean;

    @Column({ name: "is_processed" })
    isProcessed: boolean;

    @Column({ name: "created_date" })
    createdDate: Date;

    constructor() {

    }
}
