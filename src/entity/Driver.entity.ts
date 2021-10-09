import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { AddressEntity } from "./address.entity";
import { DriverComplianceEntity } from "./driver-compliance.entity";

@Index("driver_pkey", ["id"], { unique: true })
@Entity("driver", { schema: "public" })
export class DriverEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "name", length: 20 })
  name: string;

  // @Column("character varying", { name: "last_name", length: 20 })
  // lastName: string;

  @Column("character varying", { name: "user_name", length: 100 })
  userName: string | null;

  @Column("character varying", { name: "licence_no", length: 50 })
  licenceNo: string | null;

  @Column("character varying", { name: "vendor_name", length: 100 })
  vendorName: string | null;

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


  @Column("bigint", { name: "user_mst_id"})
  userMstId: number | null;

  @Column("bigint", { name: "vendor_id"})
  vendorId: number | null;

  @Column({ name: "unique_code" })
  uniqueCode: string;

  @Column("bigint", { name: "person_id"})
  personId: number | null;

  @Column("boolean", { name: "is_blackListed", nullable: true, default: () => "false" })
  isBlackListed: boolean | null;

  @Column("boolean", { name: "is_driverKYC", nullable: true, default: () => "false" })
  isDriverKYC: boolean | null;

  @Column({ name: "extensedInfo" })
  ExtensedInfo: string;

  @Column("boolean", { name: "is_deleted", nullable: true, default: () => "false" })
  isDeleted: boolean | null;

  @Column({ name: "created_date", nullable: true })
  createdDate: Date | null;

  @Column({ name: "updated_date", nullable: true })
  updatedDate: Date | null;

  driverComplianceObj : DriverComplianceEntity[];
  
  
}
