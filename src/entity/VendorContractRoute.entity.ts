import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VendorContractEntity } from "./VendorContract.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { VehicleTypeEntity } from "./vehicle-type.entity";

@Index("vendor_contract_route_pkey", ["id"], { unique: true })
@Entity("vendor_contract_route", { schema: "public" })
export class VendorContractRouteEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  @ApiProperty()
  id: number;

  @Column("character varying", { name: "from_city", length: 100 })
  fromCity: string;

  @Column("character varying", { name: "from_state", length: 100 })
  fromState: string;

  @Column("character varying", { name: "to_city", length: 100 })
  toCity: string;

  @Column("character varying", { name: "to_state", length: 100 })
  toState: string;

  @Column("character varying", { name: "truck_type", length: 100 })
  truckType: string;

  truckTypeDetail: VehicleTypeEntity; 
  // vehicleTypeDetail : VehicleTypeEntity;
  
  @Column("character varying", { name: "transit_time" })
  transitTime: string;

  @Column("character varying", { name: "advance_payment", length: 100 })
  advancePayment: string;

  @Column("character varying", { name: "other_terms", length: 100 })
  otherTerms: string;

  @ManyToOne(
    () => VendorContractEntity,
    (vendorContract) => vendorContract.vendorContractRoutes
  )
  @JoinColumn([{ name: "vendor_contract_id", referencedColumnName: "id" }])
  vendorContract: VendorContractEntity;

  @Column("character varying", { name: "amount", length: 20 })
  amount: string;

  @Column("boolean", { name: "is_loading", nullable: true, default: () => "false" })
  isLoading: boolean | null;
  
  @Column("boolean", { name: "is_unloading", nullable: true, default: () => "false" })
  isUnLoading: boolean | null;

  @Column("boolean", { name: "is_additional_charges", nullable: true, default: () => "false" })
  isAdditionalCharges: boolean | null;

  
  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

}
