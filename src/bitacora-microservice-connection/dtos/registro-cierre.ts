import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsInt, Length } from 'class-validator';

export class RegistroCierre {
  @ApiProperty()
  // @IsDefined()
  // @IsNumber()
  id: number;

  @ApiProperty()
  @IsInt()
  fnencomienda: number | null;

  @ApiProperty({
    example: '10/02/2002',
  })
  @IsDate()
  fdfecha: Date | null;

  @ApiProperty({
    example: '10:10 PM',
  })
  @Length(1, 10)
  fchora: string | null;

  @ApiProperty({
    minLength: 2,
    maxLength: 8,
    example: 'fcregistro',
  })
  @Length(1, 300)
  fcregistro: string | null;

  @ApiProperty({
    minLength: 2,
    maxLength: 8,
    example: 'fcprocedimiento',
  })
  @Length(1, 100)
  fcprocedimiento: string | null;

  constructor(
    fnencomienda: number | null,
    fdfecha: Date | null,
    fchora: string | null,
    fcregistro: string | null,
    fcprocedimiento: string | null,
  ) {
    this.fnencomienda = fnencomienda;
    this.fdfecha = fdfecha;
    this.fchora = fchora;
    this.fcregistro = fcregistro;
    this.fcprocedimiento = fcprocedimiento;
  }
}
