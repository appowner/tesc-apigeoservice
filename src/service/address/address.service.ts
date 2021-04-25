import { Injectable } from '@nestjs/common';
import { AddresRepository } from 'src/repository/address.repository';
import { BusinessError } from 'src/model/business-error';
import { BusinessException } from 'src/model/business-exception';
import { Constants } from 'src/model/constants';
import { AddressEntity } from 'src/entity/address.entity';

@Injectable()
export class AddressService {

    constructor(private addresRepository: AddresRepository) { }


    async findById(id: number): Promise<AddressEntity> {
        let address = await this.addresRepository.find({ where: { id: id } });

        if (address.length == 0) {
            throw new BusinessException(Constants.FAILURE_CODE, "Address not found for id-:" + id);

        }

        return address[0];
    }

    async findByIds(ids: number[]): Promise<AddressEntity[]> {
        let address = await this.addresRepository.findByIds(ids);

        if (address.length == 0) {
            throw new BusinessException(Constants.FAILURE_CODE, "Address not found for id-:" + ids);

        }

        if (address.length != ids.length) {

            await ids.forEach(id => {
                if (address.filter(ad => ad.id == id).length == 0) {
                    throw new BusinessException(Constants.FAILURE_CODE, "Address not found for id-:" + id);
                }
            });


        }

        return address;
    }

    public async create(addressEntity: AddressEntity): Promise<AddressEntity> {
        return await this.addresRepository.save(addressEntity);
    }

    public async update(
        newValue: AddressEntity,
    ): Promise<AddressEntity | null> {
        const addressEntity = await this.addresRepository.findOne(newValue.id);

        if (!addressEntity) {
            throw new BusinessException(Constants.FAILURE_CODE, "Address not found for id -:" + newValue.id);
        }

        newValue = await this.addresRepository.save(newValue);
        return newValue;
    }

}
