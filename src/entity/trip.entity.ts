import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  OneToOne,
  Driver,
} from "typeorm";
import { AddressEntity } from "./address.entity";
import { Address } from "cluster";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { VendorContractEntity } from "./VendorContract.entity";
import { VendorContractRouteEntity } from "./VendorContractRoute.entity";
import { FleetManagementEntity } from "./fleet-management.entity";
import { DriverEntity } from "./Driver.entity";
import { VendorPoEntity } from "./vendor-po.entity";


@Index("trip_pkey", ["id"], { unique: true })
@Entity("trip", { schema: "public" })
export class TripEntity {

  @ApiProperty()
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "name", nullable: true, length: 30 })
  name: string | null;

  @Column({ name: "unique_code" })
  uniqueCode: string;

  @Column("character varying", { name: "status", nullable: true, length: 30 })
  status: string | null;

  @Column({ name: "start_time", nullable: true })
  startTime: Date | null;

  @Column({ name: "end_time", nullable: true })
  endTime: Date | null;

  @Column("double precision", {
    name: "from_lat",
    nullable: true,
    precision: 53,
  })
  fromLat: number | null;

  @Column("double precision", {
    name: "from_long",
    nullable: true,
    precision: 53,
  })
  fromLong: number | null;

  @Column("double precision", { name: "to_lat", nullable: true, precision: 53 })
  toLat: number | null;

  @Column("double precision", {
    name: "to_long",
    nullable: true,
    precision: 53,
  })
  toLong: number | null;


  @Column({
    name: "consignee_address",
    nullable: true,
  })
  consigneeAddressId: number | null;

  // @OneToOne(type => AddressEntity, { cascade : true })   
  // @JoinColumn({name: "destination_address"})
  consigneeAddress: AddressEntity;

  @Column({
    name: "consignor_address",
    nullable: true,
  })
  consignorAddressId: number | null;

  // @OneToOne(type => AddressEntity, { cascade : true })   
  // @JoinColumn({name: "pickup_address"})
  consignorAddress: AddressEntity;

  @Column({ name: "driver_id" })
  driverId: number;

  driver : DriverEntity;

  @Column({ name: "fleet_id" })
  fleetId: number;

  @Column({ name: "order_id" })
  orderId: number;

  @Column({ name: "is_damaged" })
  isDamaged: Boolean;

  @Column({ name: "vendor_contract_id" })
  vendorContractId: number;

  @Column({ name: "vendor_contract_route_id" })
  vendorContractRouteId: number;

  vendorContractDetail: VendorContractEntity;

  vendorContractRouteDetail: VendorContractRouteEntity;

  fleet: FleetManagementEntity;

  @Column({ name: "driver_allocation_date", nullable: true })
  driverAllocationDate: string | null;

  @Column({ name: "vehicle_allocation_date", nullable: true })
  vehicleAllocationDate: string | null;  

  @Column({ name: "scheduled_arrival_date", nullable: true })
  scheduledArrivalDate: string | null;

  @Column({ name: "scheduled_departure_date", nullable: true })
  scheduledDepartureDate: string | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;  

  @Column({ name: "created_by" })  
  createdBy: string;

  @Column({ name: "created_by_name" })
  createdByName: string;

  @Column({ name: "attachment" })
  attachment: boolean;

  vendorPO : VendorPoEntity;

}
