import { IsInt, IsOptional, Length } from 'class-validator';

export class TipoAmortizacion {
  @IsInt()
  fntipoamortizacion: number;

  @Length(1, 100)
  @IsOptional()
  fcdescripcion: string | null;

  @IsInt()
  @IsOptional()
  fnperiodoanual: number | null;

  @Length(1, 100)
  @IsOptional()
  fcabreviatura: string | null;

  @IsInt()
  @IsOptional()
  fntipoperiodo: number | null;

  @IsInt()
  @IsOptional()
  fnperiodo: number | null;
}
