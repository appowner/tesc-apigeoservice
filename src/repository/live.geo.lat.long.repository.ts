import { EntityRepository, Repository } from 'typeorm';
import { LiveGeoLatLongEntity } from 'src/entity/live.geo.lat.long.entity';



@EntityRepository(LiveGeoLatLongEntity)
export class LiveGeoLatLongRepository extends Repository<LiveGeoLatLongEntity> {

}