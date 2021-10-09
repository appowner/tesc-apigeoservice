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


@Index("trip_document_pkey", ["id"], { unique: true })
@Entity("trip_document", { schema: "public" })
export class TripDocumentEntity {
  
  @ApiProperty()
  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column({name : "trip_id"})
  tripId: number;
  
  @Column("character varying", { name: "doc_name", nullable: true, length: 255 })
  docName: string | null;

  @Column("character varying", { name: "doc_type", nullable: true, length: 255 })
  docType: string | null;

  @Column("character varying", { name: "bucket_id", nullable: true, length: 1000 })
  bucketId: string | null;

  @Column("bytea", { name: "doc_data", nullable: true})
  docData: Buffer;
  
  url : string;
}
