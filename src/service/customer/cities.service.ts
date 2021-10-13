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

    public async findAllState(): Promise<Array<string>> {
        const cities = await this.citiesRepository.find();
        var states = new Set<string>();
        const stateList = new Array<string>();
        if (cities && cities.length > 0) {

            for (var user of cities) {
                states.add(user.cityState);
            }
        }
        for (var obj of states) {
            stateList.push(obj);
        }
        console.log("states-:"+JSON.stringify(stateList));

        return stateList;

    }

    public async findCityByState(cityState: string): Promise<CitiesEntity[]> {
        return await this.citiesRepository.find({ where: { cityState: cityState } });

    }

    public async findCityById(id: number): Promise<CitiesEntity> {
        return await this.citiesRepository.findOne(id);

    }

    // public async findByUserName(userName: string): Promise<CustomerEntity | null> {
    //     // return await this.customerRepository.findOne({where : {userName : userName}});
    //     return await this.customerRepository.findOne({ where: "LOWER(user_name) = LOWER('" + userName + "')" });
    // }

}
