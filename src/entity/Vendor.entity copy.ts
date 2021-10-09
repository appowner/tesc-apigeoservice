import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { VendorBankDetailEntity } from "./VendorBankDetail.entity";
import { VendorContractEntity } from "./VendorContract.entity";
import { ApiProperty } from "@nestjs/swagger/dist/decorators/api-property.decorator";
import { AddressEntity } from "./address.entity";
import { PersonEntity } from "./Person.entity";

@Index("vendor_pkey", ["id"], { unique: true })
@Entity("vendor", { schema: "public" })
export class VendorEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  @ApiProperty()
  id: number;

  @Column("character varying", { name: "name", length: 20 })
  name: string;

  @Column("character varying", { name: "user_name", length: 100 })
  userName: string;

  @Column("character varying", { name: "company_name", length: 100 })
  companyName: string;

  @Column("character varying", {
    name: "password",
    nullable: true,
    length: 500,
    default: () => "NULL::character varying",
  })
  password: string | null;

  @Column("integer", {
    name: "invalid_password_try",
    nullable: true,
    default: () => "0",
  })
  invalidPasswordTry: number | null;

  @Column("character varying", { name: "email", length: 100 })
  email: string;

  @Column("character varying", { name: "contact_number", length: 15 })
  contactNumber: string;

  @Column("character varying", { name: "otp", nullable: true })
  otp: string | null;

  @Column("timestamp without time zone", { name: "otp_time", nullable: true })
  otpTime: Date | null;

  @Column("boolean", { name: "is_active", nullable: true, default: () => "true" })
  isActive: boolean | null;

  @Column({
    name: "address",
    nullable: true,
})
addressId: number | null;


address: AddressEntity | null;

  // @Column("character varying", { name: "bank_details", length: 1000 })
  // bankDetails: string;

  @Column("character varying", { name: "gst_no", length: 100 })
  gstNo: string;

  contracts : VendorContractEntity[];

  bankDetails : VendorBankDetailEntity[];

  @Column("bigint", { name: "user_mst_id"})
  userMstId: number | null;

  @Column("character varying", { name: "city", length: 30 })
  city: string;

  @Column("character varying", { name: "state", length: 30 })
  state: string;

  driverCount : number | null;

  vehicleCount : number | null;

  @Column({ name: "unique_code" })
  uniqueCode: string;

  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

  @Column("boolean", { name: "is_blackListed", nullable: true, default: () => "false" })
  isBlackListed: boolean | null;

  @Column("boolean", { name: "is_owner_cum_driver", nullable: true, default: () => "false" })
  isOwnerCumDriver: boolean | null;

  @Column({ name: "department" })
  department: string | null;

  personMobile: string | null;

  personEmail: string | null;

  personName: string | null;

  personDetailObj : PersonEntity;
}
