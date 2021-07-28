import { EntityRepository, Repository } from 'typeorm';
import { GeoLatLongEntity } from 'src/entity/geo.lat.long.entity';



@EntityRepository(GeoLatLongEntity)
export class GeoLatLongRepository extends Repository<GeoLatLongEntity> {

}