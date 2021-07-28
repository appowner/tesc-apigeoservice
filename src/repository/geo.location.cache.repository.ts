import { EntityRepository, Repository } from 'typeorm';
import { GeoLocationCacheEntity } from 'src/entity/geo.location.cache.entity';


@EntityRepository(GeoLocationCacheEntity)
export class GeoLocationCacheRepository extends Repository<GeoLocationCacheEntity> {

}