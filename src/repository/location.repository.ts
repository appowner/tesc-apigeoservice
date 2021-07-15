import { EntityRepository, Repository } from 'typeorm';
import { LocationEntity } from 'src/entity/location.entity';


@EntityRepository(LocationEntity)
export class LocationRepository extends Repository<LocationEntity> {
   
  }