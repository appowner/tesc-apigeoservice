import { Injectable } from '@nestjs/common';
import { CitiesEntity } from 'src/entity/cities.entity';
import { CitiesRepository } from 'src/repository/cities-repository';

@Injectable()
export class CitiesService {

    constructor(private citiesRepository: CitiesRepository
       
    ) { }


    public async findAll(): Promise<CitiesEntity[]> {
        return await this.citiesRepository.find();
    }

    // public async findByUserName(userName: string): Promise<CustomerEntity | null> {
    //     // return await this.customerRepository.findOne({where : {userName : userName}});
    //     return await this.customerRepository.findOne({ where: "LOWER(user_name) = LOWER('" + userName + "')" });
    // }
    
}
