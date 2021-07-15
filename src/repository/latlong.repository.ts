import { EntityRepository, Repository } from 'typeorm';
import { LatlongEntity } from 'src/entity/latLong.entity';


@EntityRepository(LatlongEntity)
export class LatlongRepository extends Repository<LatlongEntity> {
   
  }