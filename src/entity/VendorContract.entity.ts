import {
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { VendorContractRouteEntity } from "./VendorContractRoute.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

@Index("vendor_contract_pkey", ["id"], { unique: true })
@Entity("vendor_contract", { schema: "public" })
export class VendorContractEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  @ApiProperty()
  id: number;

  @Column("character varying", {name : "name"})
  name : string;

  @Column("date", { name: "start_date" })
  startDate: string;

  @Column("date", { name: "end_date" })
  endDate: string;

  @Column({ type: 'bigint', name: "vendor_id" })
  vendorId: number;

  @Column({ name: "unique_code" })
  uniqueCode: string;

  @Column({ name: "status" })
  status: string;

  @OneToMany(
    () => VendorContractRouteEntity,
    (vendorContractRoute) => vendorContractRoute.vendorContract
  )
  vendorContractRoutes: VendorContractRouteEntity[];

  @Column({name : "contract_type"})
  contractType : string | null;

  // @Column("boolean", { name: "is_loading", nullable: true, default: () => "false" })
  // isLoading: boolean | null;
  
  // @Column("boolean", { name: "is_unloading", nullable: true, default: () => "false" })
  // isUnLoading: boolean | null;

  // @Column("boolean", { name: "is_additional_charges", nullable: true, default: () => "false" })
  // isAdditionalCharges: boolean | null;

  
  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

  
  @Column({ name: "creditDays" })
  creditDays: string | null;
  


  routeList : string | null;

  totalOrderCount : number | null;

  activeOrderCount : number | null;
  
  totalRevenue : number| null;
}
