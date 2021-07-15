import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';


@Entity({ name: "latlong" })
export class LatlongEntity {
    
    @ApiProperty()
    @PrimaryGeneratedColumn()    
    id:number;

    @Column()
    lat:string;   

    @Column()
    long:string;   

    constructor(){        
       
    }
}
