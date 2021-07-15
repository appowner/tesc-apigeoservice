import { EntityRepository, Repository } from 'typeorm';
import { GeofenceEntity } from 'src/entity/geofence.entity';


@EntityRepository(GeofenceEntity)
export class GeofenceRepository extends Repository<GeofenceEntity> {
   
  }