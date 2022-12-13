import { IsInt, IsOptional, Length } from 'class-validator';

export class ParametrosCartera {
  @IsInt()
  fnencomienda: number;

  @IsInt()
  @IsOptional()
  fnbanco: number | null;

  @Length(1, 100)
  @IsOptional()
  fcnumerodisp: string | null;

  @IsInt()
  @IsOptional()
  fnmesesdereut: number | null;

  @Length(1, 100)
  @IsOptional()
  fcrecordcntl: string | null;

  @IsInt()
  @IsOptional()
  fniva: number | null;

  @IsInt()
  @IsOptional()
  fntasadeimpuesto1: number | null;

  @IsInt()
  @IsOptional()
  fntasadeimpuesto2: number | null;

  @Length(1, 100)
  @IsOptional()
  fcregion: string | null;

  @IsInt()
  @IsOptional()
  fgcalintegrado: number | null;

  @IsInt()
  @IsOptional()
  fnminimoparacgo: number | null;

  @IsInt()
  @IsOptional()
  fntasabaseisrpf: number | null;

  @IsInt()
  @IsOptional()
  fntasabaseisrpm: number | null;

  @IsInt()
  @IsOptional()
  fntasadelisrpf: number | null;

  @IsInt()
  @IsOptional()
  fntasadelisrpm: number | null;

  @IsInt()
  @IsOptional()
  fntasaisrudispf: number | null;

  @IsInt()
  @IsOptional()
  fntasaisrudispm: number | null;

  @IsInt()
  @IsOptional()
  fnsalariomingral: number | null;

  @Length(1, 100)
  @IsOptional()
  fcanioacalcsmg: string | null;

  @IsInt()
  @IsOptional()
  fntasadelaunion: number | null;

  @IsInt()
  @IsOptional()
  fgejecutadobackup: number | null;

  @IsInt()
  @IsOptional()
  fnoficina: number | null;

  @Length(1, 100)
  @IsOptional()
  fcdigitosucursal: string | null;

  @IsInt()
  @IsOptional()
  fnnumeros: number | null;

  @Length(1, 100)
  @IsOptional()
  fcmonedanacional: string | null;

  @Length(1, 100)
  @IsOptional()
  fcidrespaldo: string | null;
}
