import { EntityRepository, Repository } from 'typeorm';
import { CitiesEntity } from 'src/entity/cities.entity';


@EntityRepository(CitiesEntity)
export class CitiesRepository extends Repository<CitiesEntity> {
   
  }