import { IsInt } from 'class-validator';

export class TasasLider {
  @IsInt()
  fnencomienda: number;

  @IsInt()
  fntasalider: number;

  @IsInt()
  fntipoplazo: number;

  @IsInt()
  fnplazo: number;

  @IsInt()
  fndia: number;
}
