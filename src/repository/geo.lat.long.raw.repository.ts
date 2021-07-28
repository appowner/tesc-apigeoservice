import { EntityRepository, Repository } from 'typeorm';
import { GeoLatLongRawEntity } from 'src/entity/geo.lat.long.raw.entity';



@EntityRepository(GeoLatLongRawEntity)
export class GeoLatLongRawRepository extends Repository<GeoLatLongRawEntity> {

}