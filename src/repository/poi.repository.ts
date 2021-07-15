import { EntityRepository, Repository } from 'typeorm';
import { PoiEntity } from 'src/entity/poi.entity';


@EntityRepository(PoiEntity)
export class PoiRepository extends Repository<PoiEntity> {
   
  }