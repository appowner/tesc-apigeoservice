import { EntityRepository, Repository } from 'typeorm';
import { AddressEntity } from 'src/entity/address.entity';



@EntityRepository(AddressEntity)
export class AddresRepository extends Repository<AddressEntity> {
   
  }