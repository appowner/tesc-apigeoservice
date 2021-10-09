import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { VehicleComplianceEntity } from "./vehicle-compliance.entity";
import { VehicleTypeEntity } from "./vehicle-type.entity";
import { LovVal } from "./LovVal.entity";


@Index("fleet_management_pkey", ["id"], { unique: true })
@Entity("fleet_management", { schema: "public" })
export class FleetManagementEntity {
  
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  @ApiProperty()
  id: number;

  // @Column("character varying", { name: "name", length: 100 })
  // name: string;
  
  @Column({ name: "vendor_id"})
  vendorId: number;

  @Column("character varying", { name: "vendor_company", length: 100 })
  vendorCompany: string;

  @Column("character varying", { name: "truck_type", length: 100 })
  truckType: string;

  vehicleTypeDetail : VehicleTypeEntity;

  @Column("character varying", { name: "vehicle_brand", length: 100 })
  vehicleBrand: string;

  vehicleBrandDetail : LovVal;

  @Column("character varying", { name: "truck_no", length: 100 })
  truckNo: string;

  @Column("character varying", { name: "puc_no", length: 100 })
  pucNo: string;

  @Column("character varying", { name: "fitness_details", length: 500 })
  fitnessDetails: string;

  @Column("character varying", { name: "rc_details", length: 500 })
  rcDetails: string;

  @Column("date", { name: "validity" })
  validity: Date | null;


  @Column("character varying", { name: "permits", length: 1000 })
  permits: string;

  @Column({ name: "unique_code" })
  uniqueCode: string;

  @Column({ name: "note" })
  note: string;

  @Column("boolean", { name: "is_blackListed", nullable: true, default: () => "false" })
  isBlackListed: boolean | null;

  @Column("boolean", { name: "is_active", nullable: true, default: () => "true" })
  isActive: boolean | null;

  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

  @Column("boolean", { name: "is_vehiclekyc", nullable: true, default: () => "false" })
  isVehicleKYC: boolean | null;
  
  vehicleComplianceObj : VehicleComplianceEntity[];
}
