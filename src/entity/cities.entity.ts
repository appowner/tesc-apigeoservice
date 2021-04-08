import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("cities_pkey", ["id"], { unique: true })
@Entity("cities", { schema: "public" })
export class CitiesEntity {

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "city_name", length: 100 })
  cityName: string;

  @Column("character varying", { name: "city_state", length: 100 })
  cityState: string;
  
}
