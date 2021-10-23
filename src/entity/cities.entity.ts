import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";
import { GeofenceEntity } from "./geofence.entity";
import { LatlongEntity } from "./latLong.entity";
import { PoiEntity } from "./poi.entity";

@Index("cities_pkey", ["id"], { unique: true })
@Entity("cities", { schema: "public" })
export class CitiesEntity {

  @PrimaryGeneratedColumn({ type: "bigint", name: "id" })
  id: number;

  @Column("character varying", { name: "city_name" })
  cityName: string;

  @Column("character varying", { name: "city_state" })
  cityState: string;
  
  @Column({name: "lat_long_id"})
  latLongId:number;   
  
  latLong:LatlongEntity;

  @Column({name : "poi_id"})
  poiId:number;   
  
  poi:PoiEntity;   

  @Column({name : "fence_id"})
  fenceId:number;   

  fence : GeofenceEntity;

}
