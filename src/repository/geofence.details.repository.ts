import { EntityRepository, Repository } from 'typeorm';
import { GeofenceDetailsEntity } from 'src/entity/geofence.details.entity';


@EntityRepository(GeofenceDetailsEntity)
export class GeofenceDetailsRepository extends Repository<GeofenceDetailsEntity> {
   
  }