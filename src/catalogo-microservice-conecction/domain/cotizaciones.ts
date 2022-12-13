import { IsDate, IsInt } from 'class-validator';

export class TipoCotizacion {
  @IsInt()
  fnmoneda: number;

  @IsDate()
  fdfechacotizacion: Date;

  @IsInt()
  fncotizacioncompra: number;

  @IsInt()
  fncotizacionventa: number;
}
