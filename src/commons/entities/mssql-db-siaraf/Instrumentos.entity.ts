import { Column, Entity, Index } from 'typeorm';
import { IsCurrency, IsInt, IsOptional, Length } from 'class-validator';

@Index('PK_tbl_sci_inst_1', ['fnencomienda', 'fninstrumento'], { unique: true })
@Entity('tbl_sci_inst', { schema: 'dbo' })
export class InstrumentosEntity {
  @Column('int', { primary: true, name: 'fnencomienda' })
  @IsInt()
  fnencomienda: number;

  @Column('int', { primary: true, name: 'fninstrumento' })
  @IsInt()
  fninstrumento: number;

  @Column('int', { name: 'fnfuentefinanciera' })
  @IsInt()
  fnfuentefinanciera: number;

  @Column('varchar', { name: 'fcdescripcion', nullable: true, length: 50 })
  @Length(1, 50)
  @IsOptional()
  fcdescripcion: string | null;

  @Column('varchar', { name: 'fcdestino', nullable: true, length: 300 })
  @Length(1, 300)
  @IsOptional()
  fcdestino: string | null;

  @Column('int', { name: 'fntipocredito', nullable: true })
  @IsInt()
  @IsOptional()
  fntipocredito: number | null;

  @Column('int', { name: 'fnprograma' })
  @IsInt()
  fnprograma: number;

  @Column('int', { name: 'fnmonedacredito', nullable: true })
  @IsInt()
  @IsOptional()
  fnmonedacredito: number | null;

  @Column('int', { name: 'fncobrointereses', nullable: true })
  @IsInt()
  @IsOptional()
  fncobrointereses: number | null;

  @Column('varchar', { name: 'fcmodalidadcobint', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fcmodalidadcobint: string | null;

  @Column('varchar', { name: 'fctipodescuento', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctipodescuento: string | null;

  @Column('varchar', { name: 'fctipocalendario', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctipocalendario: string | null;

  @Column('decimal', {
    name: 'fnmontomaximo',
    nullable: true,
    precision: 18,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fnmontomaximo: number | null;

  @Column('int', { name: 'fnmonedamontomax', nullable: true })
  @IsInt()
  @IsOptional()
  fnmonedamontomax: number | null;

  @Column('int', { name: 'fnplazomaximo', nullable: true })
  @IsInt()
  @IsOptional()
  fnplazomaximo: number | null;

  @Column('int', { name: 'fntipoplazomax', nullable: true })
  @IsInt()
  @IsOptional()
  fntipoplazomax: number | null;

  @Column('int', { name: 'fnplazograciacap', nullable: true })
  @IsInt()
  @IsOptional()
  fnplazograciacap: number | null;

  @Column('int', { name: 'fnplazograciaint', nullable: true })
  @IsInt()
  @IsOptional()
  fnplazograciaint: number | null;

  @Column('int', { name: 'fntipoplazogracia', nullable: true })
  @IsInt()
  @IsOptional()
  fntipoplazogracia: number | null;

  @Column('varchar', { name: 'fcpagosanticipados', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fcpagosanticipados: string | null;

  @Column('int', { name: 'fntipopagos1', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos1: number | null;

  @Column('int', { name: 'fntipopagos2', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos2: number | null;

  @Column('int', { name: 'fntipopagos3', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos3: number | null;

  @Column('int', { name: 'fntipopagos4', nullable: true })
  @IsInt()
  @IsOptional()
  fntipopagos4: number | null;

  @Column('varchar', { name: 'fctipodisposicion1', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctipodisposicion1: string | null;

  @Column('varchar', { name: 'fctipodisposicion2', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctipodisposicion2: string | null;

  @Column('varchar', { name: 'fctipodisposicion3', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctipodisposicion3: string | null;

  @Column('tinyint', { name: 'fgcondcontrato', nullable: true })
  @IsInt()
  @IsOptional()
  fgcondcontrato: number | null;

  @Column('int', { name: 'fntasalider', nullable: true })
  @IsInt()
  @IsOptional()
  fntasalider: number | null;

  @Column('varchar', { name: 'fcoperadortasa1', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fcoperadortasa1: string | null;

  @Column('varchar', { name: 'fcoperadortasa2', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fcoperadortasa2: string | null;

  @Column('decimal', {
    name: 'fnvaloroperador1',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnvaloroperador1: number | null;

  @Column('decimal', {
    name: 'fnvaloroperador2',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnvaloroperador2: number | null;

  @Column('varchar', { name: 'fcredondeotasa', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fcredondeotasa: string | null;

  @Column('int', { name: 'fnrevisiontasa', nullable: true })
  @IsInt()
  @IsOptional()
  fnrevisiontasa: number | null;

  @Column('varchar', { name: 'fctiporevisiontas', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctiporevisiontas: string | null;

  @Column('varchar', { name: 'fcoperadortasamor', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fcoperadortasamor: string | null;

  @Column('decimal', {
    name: 'fnvaloroptasamor',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnvaloroptasamor: number | null;

  @Column('varchar', { name: 'fctratamientos1', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctratamientos1: string | null;

  @Column('varchar', { name: 'fctratamientos2', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctratamientos2: string | null;

  @Column('varchar', { name: 'fctratamientos3', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctratamientos3: string | null;

  @Column('varchar', { name: 'fctratamientos4', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctratamientos4: string | null;

  @Column('varchar', { name: 'fctratamientos5', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctratamientos5: string | null;

  @Column('varchar', { name: 'fctratamientos6', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctratamientos6: string | null;

  @Column('varchar', { name: 'fctipoproductor1', nullable: true, length: 5 })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor1: string | null;

  @Column('varchar', { name: 'fctipoproductor2', nullable: true, length: 5 })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor2: string | null;

  @Column('varchar', { name: 'fctipoproductor3', nullable: true, length: 5 })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor3: string | null;

  @Column('varchar', { name: 'fctipoproductor4', nullable: true, length: 5 })
  @Length(1, 5)
  @IsOptional()
  fctipoproductor4: string | null;

  @Column('varchar', { name: 'fcgarantiasclte1', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte1: string | null;

  @Column('varchar', { name: 'fcgarantiasclte2', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte2: string | null;

  @Column('varchar', { name: 'fcgarantiasclte3', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte3: string | null;

  @Column('varchar', { name: 'fcgarantiasclte4', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fcgarantiasclte4: string | null;

  @Column('varchar', { name: 'fccomisiones1', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisiones1: string | null;

  @Column('varchar', { name: 'fccomisiones2', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisiones2: string | null;

  @Column('varchar', { name: 'fccomisiones3', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisiones3: string | null;

  @Column('varchar', { name: 'fccomisiones4', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisiones4: string | null;

  @Column('varchar', { name: 'fccomisiones5', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisiones5: string | null;

  @Column('decimal', {
    name: 'fncomisionesvalor1',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fncomisionesvalor1: number | null;

  @Column('decimal', {
    name: 'fncomisionesvalor2',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fncomisionesvalor2: number | null;

  @Column('decimal', {
    name: 'fncomisionesvalor3',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  fncomisionesvalor3: number | null;

  @Column('decimal', {
    name: 'fncomisionesvalor4',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  fncomisionesvalor4: number | null;

  @Column('decimal', {
    name: 'fncomisionesvalor5',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fncomisionesvalor5: number | null;

  @Column('decimal', {
    name: 'fncobrominimocom1',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom1: number | null;

  @Column('decimal', {
    name: 'fncobrominimocom2',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom2: number | null;

  @Column('decimal', {
    name: 'fncobrominimocom3',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom3: number | null;

  @Column('decimal', {
    name: 'fncobrominimocom4',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom4: number | null;

  @Column('decimal', {
    name: 'fncobrominimocom5',
    nullable: true,
    precision: 9,
    scale: 2,
  })
  @IsCurrency()
  @IsOptional()
  fncobrominimocom5: number | null;

  @Column('tinyint', { name: 'fglineas', nullable: true })
  @IsInt()
  @IsOptional()
  fglineas: number | null;

  @Column('tinyint', { name: 'fgcaracteristica1', nullable: true })
  @IsInt()
  @IsOptional()
  fgcaracteristica1: number | null;

  @Column('tinyint', { name: 'fgusuario', nullable: true })
  @IsInt()
  @IsOptional()
  fgusuario: number | null;

  @Column('tinyint', { name: 'fgunidad', nullable: true })
  @IsInt()
  @IsOptional()
  fgunidad: number | null;

  @Column('tinyint', { name: 'fgnumevaluacion', nullable: true })
  @IsInt()
  @IsOptional()
  fgnumevaluacion: number | null;

  @Column('tinyint', { name: 'fgconceptoinver', nullable: true })
  @IsInt()
  @IsOptional()
  fgconceptoinver: number | null;

  @Column('tinyint', { name: 'fgindividualizable', nullable: true })
  @IsInt()
  @IsOptional()
  fgindividualizable: number | null;

  @Column('tinyint', { name: 'fgagrupable', nullable: true })
  @IsInt()
  @IsOptional()
  fgagrupable: number | null;

  @Column('tinyint', { name: 'fgcobroiva', nullable: true })
  @IsInt()
  @IsOptional()
  fgcobroiva: number | null;

  @Column('decimal', {
    name: 'fnpropdedescuento',
    nullable: true,
    precision: 7,
    scale: 6,
  })
  @IsCurrency()
  @IsOptional()
  fnpropdedescuento: number | null;

  @Column('varchar', { name: 'fctipomargeninter', nullable: true, length: 1 })
  @Length(1, 1)
  @IsOptional()
  fctipomargeninter: string | null;

  @Column('decimal', {
    name: 'fnmargenintermed1',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnmargenintermed1: number | null;

  @Column('decimal', {
    name: 'fnmargenintermed2',
    nullable: true,
    precision: 5,
    scale: 4,
  })
  @IsCurrency()
  @IsOptional()
  fnmargenintermed2: number | null;

  @Column('varchar', { name: 'fctipogarfuente1', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente1: string | null;

  @Column('varchar', { name: 'fctipogarfuente2', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente2: string | null;

  @Column('varchar', { name: 'fctipogarfuente3', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente3: string | null;

  @Column('varchar', { name: 'fctipogarfuente4', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fctipogarfuente4: string | null;

  @Column('varchar', { name: 'fccomisionesfte1', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte1: string | null;

  @Column('varchar', { name: 'fccomisionesfte2', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte2: string | null;

  @Column('varchar', { name: 'fccomisionesfte3', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte3: string | null;

  @Column('varchar', { name: 'fccomisionesfte4', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte4: string | null;

  @Column('varchar', { name: 'fccomisionesfte5', nullable: true, length: 2 })
  @Length(1, 2)
  @IsOptional()
  fccomisionesfte5: string | null;

  @Column('decimal', {
    name: 'fnvalorcomisfte1',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte1: number | null;

  @Column('decimal', {
    name: 'fnvalorcomisfte2',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte2: number | null;

  @Column('decimal', {
    name: 'fnvalorcomisfte3',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte3: number | null;

  @Column('decimal', {
    name: 'fnvalorcomisfte4',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte4: number | null;

  @Column('decimal', {
    name: 'fnvalorcomisfte5',
    nullable: true,
    precision: 4,
    scale: 3,
  })
  @IsCurrency()
  @IsOptional()
  fnvalorcomisfte5: number | null;

  @Column('int', { name: 'fntipocreditoorig', nullable: true })
  @IsInt()
  @IsOptional()
  fntipocreditoorig: number | null;

  @Column('decimal', {
    name: 'fnfronteramaxima',
    nullable: true,
    precision: 7,
    scale: 6,
  })
  @IsCurrency()
  @IsOptional()
  fnfronteramaxima: number | null;

  @Column('decimal', {
    name: 'fnfronteraminima',
    nullable: true,
    precision: 7,
    scale: 6,
  })
  @IsCurrency()
  @IsOptional()
  fnfronteraminima: number | null;

  @Column('int', { name: 'fntipo', nullable: true })
  @IsInt()
  @IsOptional()
  fntipo: number | null;

  @Column('varchar', { name: 'fcinstrumentofte', nullable: true, length: 10 })
  @Length(1, 10)
  @IsOptional()
  fcinstrumentofte: string | null;
}
