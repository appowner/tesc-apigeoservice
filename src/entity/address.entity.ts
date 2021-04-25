import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';


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

    constructor(){        
       
    }
}
