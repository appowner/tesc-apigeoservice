import { EntityRepository, Repository } from 'typeorm';
import { GeoTrackingObjectEntity } from 'src/entity/geo.tracking.object.entity';


@EntityRepository(GeoTrackingObjectEntity)
export class GeoTrackingObjectRepository extends Repository<GeoTrackingObjectEntity> {

}