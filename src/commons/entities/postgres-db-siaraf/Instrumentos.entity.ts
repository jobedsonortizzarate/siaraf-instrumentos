import { Column, Entity, Index } from 'typeorm';
import { IsCurrency, IsInt, IsOptional, Length } from 'class-validator';

@Index('pk_tbl_sci_inst_1', ['fnencomienda', 'fninstrumento'], { unique: true })
@Entity('tbl_sci_inst', { schema: 'public', database: 'DB_SIARAF' })
export class InstrumentosEntity {
  @Column('integer', { primary: true, name: 'fnencomienda' })
  @IsInt()
  fnencomienda: number;

  @Column('integer', { primary: true, name: 'fninstrumento' })
  @IsInt()
  fninstrumento: number;

  @Column('integer', { name: 'fnfuentefinanciera' })
  @IsInt()
  fnfuentefinanciera: number;

  @Column('character varying', {
    name: 'fcdescripcion',
    nullable: true,
    length: 50,
  })
  @Length(1, 50)
  @IsOptional()
  fcdescripcion: string | null;

  @Column('character varying', {
    name: 'fcdestino',
    nullable: true,
    length: 300,
  })
  fcdestino: string | null;

  @Column('integer', { name: 'fntipocredito', nullable: true })
  @IsInt()
  @IsOptional()
  fntipocredito: number | null;

  @Column('integer', { name: 'fnprograma' })
  @IsInt()
  fnprograma: number;

  @Column('integer', { name: 'fnmonedacredito', nullable: true })
  @IsInt()
  @IsOptional()
  fnmonedacredito: number | null;

  @Column('integer', { name: 'fncobrointereses', nullable: true })
  @IsInt()
  @IsOptional()
  fncobrointereses: number | null;

  @Column('character varying', {
    name: 'fcmodalidadcobint',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fcmodalidadcobint: string | null;

  @Column('character varying', {
    name: 'fctipodescuento',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctipodescuento: string | null;

  @Column('character varying', {
    name: 'fctipocalendario',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctipocalendario: string | null;

  @Column('numeric', {
    name: 'fnmontomaximo',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fnmontomaximo: string | null;

  @Column('integer', { name: 'fnmonedamontomax', nullable: true })
  @IsInt()
  @IsOptional()
  fnmonedamontomax: number | null;

  @Column('integer', { name: 'fnplazomaximo', nullable: true })
  @IsInt()
  @IsOptional()
  fnplazomaximo: number | null;

  @Column('integer', { name: 'fntipoplazomax', nullable: true })
  @IsInt()
  @IsOptional()
  fntipoplazomax: number | null;

  @Column('integer', { name: 'fnplazograciacap', nullable: true })
  @IsInt()
  @IsOptional()
  fnplazograciacap: number | null;

  @Column('integer', { name: 'fnplazograciaint', nullable: true })
  @IsInt()
  @IsOptional()
  fnplazograciaint: number | null;

  @Column('integer', { name: 'fntipoplazogracia', nullable: true })
  @IsInt()
  @IsOptional()
  fntipoplazogracia: number | null;

  @Column('character varying', {
    name: 'fcpagosanticipados',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fcpagosanticipados: string | null;

  @Column('integer', { name: 'fntipopagos1', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos1: number | null;

  @Column('integer', { name: 'fntipopagos2', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos2: number | null;

  @Column('integer', { name: 'fntipopagos3', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos3: number | null;

  @Column('integer', { name: 'fntipopagos4', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos4: number | null;

  @Column('character varying', {
    name: 'fctipodisposicion1',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctipodisposicion1: string | null;

  @Column('character varying', {
    name: 'fctipodisposicion2',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctipodisposicion2: string | null;

  @Column('character varying', {
    name: 'fctipodisposicion3',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctipodisposicion3: string | null;

  @Column('smallint', { name: 'fgcondcontrato', nullable: true })
  @IsInt()
  @IsOptional()
  fgcondcontrato: number | null;

  @Column('integer', { name: 'fntasalider', nullable: true })
  @IsInt()
  @IsOptional()
  fntasalider: number | null;

  @Column('character varying', {
    name: 'fcoperadortasa1',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fcoperadortasa1: string | null;

  @Column('character varying', {
    name: 'fcoperadortasa2',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fcoperadortasa2: string | null;

  @Column('numeric', {
    name: 'fnvaloroperador1',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnvaloroperador1: string | null;

  @Column('numeric', {
    name: 'fnvaloroperador2',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnvaloroperador2: string | null;

  @Column('character varying', {
    name: 'fcredondeotasa',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fcredondeotasa: string | null;

  @Column('integer', { name: 'fnrevisiontasa', nullable: true })
  @IsInt()
  @IsOptional()
  fnrevisiontasa: number | null;

  @Column('character varying', {
    name: 'fctiporevisiontas',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctiporevisiontas: string | null;

  @Column('character varying', {
    name: 'fcoperadortasamor',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fcoperadortasamor: string | null;

  @Column('numeric', {
    name: 'fnvaloroptasamor',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnvaloroptasamor: string | null;

  @Column('character varying', {
    name: 'fctratamientos1',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctratamientos1: string | null;

  @Column('character varying', {
    name: 'fctratamientos2',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctratamientos2: string | null;

  @Column('character varying', {
    name: 'fctratamientos3',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctratamientos3: string | null;

  @Column('character varying', {
    name: 'fctratamientos4',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctratamientos4: string | null;

  @Column('character varying', {
    name: 'fctratamientos5',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctratamientos5: string | null;

  @Column('character varying', {
    name: 'fctratamientos6',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctratamientos6: string | null;

  @Column('character varying', {
    name: 'fctipoproductor1',
    nullable: true,
    length: 5,
  })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor1: string | null;

  @Column('character varying', {
    name: 'fctipoproductor2',
    nullable: true,
    length: 5,
  })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor2: string | null;

  @Column('character varying', {
    name: 'fctipoproductor3',
    nullable: true,
    length: 5,
  })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor3: string | null;

  @Column('character varying', {
    name: 'fctipoproductor4',
    nullable: true,
    length: 5,
  })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor4: string | null;

  @Column('character varying', {
    name: 'fcgarantiasclte1',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte1: string | null;

  @Column('character varying', {
    name: 'fcgarantiasclte2',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte2: string | null;

  @Column('character varying', {
    name: 'fcgarantiasclte3',
    nullable: true,
    length: 2,
  })
  fcgarantiasclte3: string | null;

  @Column('character varying', {
    name: 'fcgarantiasclte4',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte4: string | null;

  @Column('character varying', {
    name: 'fccomisiones1',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisiones1: string | null;

  @Column('character varying', {
    name: 'fccomisiones2',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisiones2: string | null;

  @Column('character varying', {
    name: 'fccomisiones3',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisiones3: string | null;

  @Column('character varying', {
    name: 'fccomisiones4',
    nullable: true,
    length: 2,
  })
  fccomisiones4: string | null;

  @Column('character varying', {
    name: 'fccomisiones5',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisiones5: string | null;

  @Column('numeric', {
    name: 'fncomisionesvalor1',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fncomisionesvalor1: string | null;

  @Column('numeric', {
    name: 'fncomisionesvalor2',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fncomisionesvalor2: string | null;

  @Column('numeric', {
    name: 'fncomisionesvalor3',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  fncomisionesvalor3: string | null;

  @Column('numeric', {
    name: 'fncomisionesvalor4',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  fncomisionesvalor4: string | null;

  @Column('numeric', {
    name: 'fncomisionesvalor5',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fncomisionesvalor5: string | null;

  @Column('numeric', {
    name: 'fncobrominimocom1',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom1: string | null;

  @Column('numeric', {
    name: 'fncobrominimocom2',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom2: string | null;

  @Column('numeric', {
    name: 'fncobrominimocom3',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom3: string | null;

  @Column('numeric', {
    name: 'fncobrominimocom4',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom4: string | null;

  @Column('numeric', {
    name: 'fncobrominimocom5',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom5: string | null;

  @Column('smallint', { name: 'fglineas', nullable: true })
  @IsInt()
  @IsOptional()
  fglineas: number | null;

  @Column('smallint', { name: 'fgcaracteristica1', nullable: true })
  @IsInt()
  @IsOptional()
  fgcaracteristica1: number | null;

  @Column('smallint', { name: 'fgusuario', nullable: true })
  @IsInt()
  @IsOptional()
  fgusuario: number | null;

  @Column('smallint', { name: 'fgunidad', nullable: true })
  @IsInt()
  @IsOptional()
  fgunidad: number | null;

  @Column('smallint', { name: 'fgnumevaluacion', nullable: true })
  @IsInt()
  @IsOptional()
  fgnumevaluacion: number | null;

  @Column('smallint', { name: 'fgconceptoinver', nullable: true })
  @IsInt()
  @IsOptional()
  fgconceptoinver: number | null;

  @Column('smallint', { name: 'fgindividualizable', nullable: true })
  @IsInt()
  @IsOptional()
  fgindividualizable: number | null;

  @Column('smallint', { name: 'fgagrupable', nullable: true })
  @IsInt()
  @IsOptional()
  fgagrupable: number | null;

  @Column('smallint', { name: 'fgcobroiva', nullable: true })
  @IsInt()
  @IsOptional()
  fgcobroiva: number | null;

  @Column('numeric', {
    name: 'fnpropdedescuento',
    nullable: true,
    precision: 7,
    scale: 6,
  })
  @IsCurrency()
  @IsOptional()
  fnpropdedescuento: string | null;

  @Column('character varying', {
    name: 'fctipomargeninter',
    nullable: true,
    length: 1,
  })
  @Length(1, 1)
  @IsOptional()
  fctipomargeninter: string | null;

  @Column('numeric', {
    name: 'fnmargenintermed1',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnmargenintermed1: number | null;

  @Column('numeric', {
    name: 'fnmargenintermed2',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnmargenintermed2: number | null;

  @Column('character varying', {
    name: 'fctipogarfuente1',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente1: string | null;

  @Column('character varying', {
    name: 'fctipogarfuente2',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente2: string | null;

  @Column('character varying', {
    name: 'fctipogarfuente3',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente3: string | null;

  @Column('character varying', {
    name: 'fctipogarfuente4',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente4: string | null;

  @Column('character varying', {
    name: 'fccomisionesfte1',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte1: string | null;

  @Column('character varying', {
    name: 'fccomisionesfte2',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte2: string | null;

  @Column('character varying', {
    name: 'fccomisionesfte3',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte3: string | null;

  @Column('character varying', {
    name: 'fccomisionesfte4',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte4: string | null;

  @Column('character varying', {
    name: 'fccomisionesfte5',
    nullable: true,
    length: 2,
  })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte5: string | null;

  @Column('numeric', {
    name: 'fnvalorcomisfte1',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte1: string | null;

  @Column('numeric', {
    name: 'fnvalorcomisfte2',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte2: string | null;

  @Column('numeric', {
    name: 'fnvalorcomisfte3',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  fnvalorcomisfte3: string | null;

  @Column('numeric', {
    name: 'fnvalorcomisfte4',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte4: string | null;

  @Column('numeric', {
    name: 'fnvalorcomisfte5',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte5: string | null;

  @Column('integer', { name: 'fntipocreditoorig', nullable: true })
  @IsInt()
  @IsOptional()
  fntipocreditoorig: number | null;

  @Column('numeric', {
    name: 'fnfronteramaxima',
    nullable: true,
    precision: 7,
    scale: 6,
  })
  @IsCurrency()
  @IsOptional()
  fnfronteramaxima: number | null;

  @Column('numeric', {
    name: 'fnfronteraminima',
    nullable: true,
    precision: 7,
    scale: 6,
  })
  @IsCurrency()
  @IsOptional()
  fnfronteraminima: number | null;

  @Column('integer', { name: 'fntipo', nullable: true })
  @IsInt()
  @IsOptional()
  fntipo: number | null;

  @Column('character varying', {
    name: 'fcinstrumentofte',
    nullable: true,
    length: 10,
  })
  @Length(1, 10)
  @IsOptional()
  fcinstrumentofte: string | null;

  @Column('character', { name: 'trial349', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  trial349: string | null;
}
