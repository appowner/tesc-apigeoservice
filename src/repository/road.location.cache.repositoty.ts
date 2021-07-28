import { EntityRepository, Repository } from 'typeorm';
import { RoadLocationCacheEntity } from 'src/entity/road.location.cache.entity';


@EntityRepository(RoadLocationCacheEntity)
export class RoadLocationCacheRepository extends Repository<RoadLocationCacheEntity> {

}