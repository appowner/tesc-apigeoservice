import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';


@Entity({ name: "poi" })
export class PoiEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    lat:string;   

    @Column()
    long:string;   

    @Column({name: "poi_provider"})
    poiProvider:string;

    @Column({name: "display_name"})
    displayName:string;

    @Column({name: "source_provider"})
    sourceProvider:number;

    constructor(){        
       
    }
}
