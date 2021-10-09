import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";

@Entity("vendor_po", { schema: "public" })
export class VendorPoEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "vendor_po_id" })
  @ApiProperty()
  vendorPoId: number;

  @Column("bigint", { name: "vendor_id"})
  vendorId: number;

  @Column("bigint", { name: "trip_id"})
  tripId: number;

  @Column("character varying", { name: "po_no"})
  poNo: string;

  @Column("character varying", { name: "mode_of_creation"})
  modeOfCreation: string;
  
  @Column({ name: "route_id" })
  routeId: number;

  @Column({ name: "amount" })
  amount: string;
  
  @Column({ name: "advance_given" })
  advanceGiven: string;

  @Column({ name: "balance" })
  balance: string;
  
  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

}
