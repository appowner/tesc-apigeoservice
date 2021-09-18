import { Injectable } from '@nestjs/common';
import { AddresRepository } from 'src/repository/address.repository';
import { BusinessError } from 'src/model/business-error';
import { BusinessException } from 'src/model/business-exception';
import { Constants } from 'src/model/constants';
import { AddressEntity } from 'src/entity/address.entity';
import { GeofenceEntity } from 'src/entity/geofence.entity';
import { LatlongEntity } from 'src/entity/latLong.entity';
import { PoiEntity } from 'src/entity/poi.entity';
import { LocationService } from '../location/location.service';

@Injectable()
export class AddressService {

    constructor(
        private addresRepository: AddresRepository,
        private locationService : LocationService
        ) { }


    async findById(id: number): Promise<AddressEntity> {
        let address = await this.addresRepository.find({ where: { id: id } });

        if (address.length == 0) {
            throw new BusinessException(Constants.FAILURE_CODE, "Address not found for id-:" + id);

        }

        return address[0];
    }

    async findByIds(ids: number[]): Promise<AddressEntity[]> {

        if(ids == undefined|| ids.length == 0){
            return new Promise(res => {
                res([]);
            });
        }

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

    public async create(req, addressEntity: AddressEntity): Promise<AddressEntity> {
        let latLong: LatlongEntity;
        let geofence: GeofenceEntity;
        let poi: PoiEntity;
        if (addressEntity.latLong) {
            latLong = await this.locationService.createLatlong(req, addressEntity.latLong);
            addressEntity.latLongId = latLong.id;
            addressEntity.latLong = latLong;
        }

        if (addressEntity.fence) {
            geofence = await this.locationService.createGeofence(req, addressEntity.fence);
            addressEntity.fenceId = geofence.id;
            addressEntity.fence = geofence;
        }

        if (addressEntity.poi) {
            poi = await this.locationService.createPoi(req, addressEntity.poi);
            addressEntity.poiId = poi.id;
            addressEntity.poi = poi;
        }

        
        return await this.addresRepository.save(addressEntity);
    }

    public async update(req, 
        newValue: AddressEntity,
    ): Promise<AddressEntity | null> {
        const addressEntity = await this.addresRepository.findOne(newValue.id);

        if (!addressEntity) {
            throw new BusinessException(Constants.FAILURE_CODE, "Address not found for id -:" + newValue.id);
        }
        let latLong: LatlongEntity;
        let geofence: GeofenceEntity;
        let poi: PoiEntity;
        if (addressEntity.latLong && addressEntity.latLongId) {
            addressEntity.latLong.id = addressEntity.latLongId;
            latLong = await this.locationService.updateLatlong(req, addressEntity.latLong);
            addressEntity.latLongId = latLong.id;
            addressEntity.latLong = latLong;
        }

        if (addressEntity.fence && addressEntity.fenceId) {
            geofence = await this.locationService.updateGeofence(req, addressEntity.fence);
            addressEntity.fenceId = geofence.id;
            addressEntity.fence = geofence;
        }

        if (addressEntity.poi && !addressEntity.poi.id) {
            poi = await this.locationService.updatePoi(req, addressEntity.poi);
            addressEntity.poiId = poi.id;
            addressEntity.poi = poi;
        }

        newValue = await this.addresRepository.save(newValue);
        return newValue;
    }

}
