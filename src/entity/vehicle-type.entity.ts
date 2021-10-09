import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { LovVal } from "./LovVal.entity";


@Index("vehicle_type_pkey", ["id"], { unique: true })
@Entity("vehicle_type", { schema: "public" })
export class VehicleTypeEntity {
  
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  @ApiProperty()
  id: number;
  
  @Column({ name: "model"})
  model: string;

  @Column("character varying", { name: "name",})
  name: string;

  @Column("character varying", { name: "capacity", length: 100 })
  capacity: string;

  capacityDetail : LovVal;

  @Column("boolean", { name: "is_active", nullable: true, default: () => "true" })
  isActive: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;
}
