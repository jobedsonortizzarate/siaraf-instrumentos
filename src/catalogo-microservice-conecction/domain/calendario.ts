import {
  IsDate,
  IsDateString,
  IsInt,
  IsOptional,
  Length,
} from 'class-validator';

export class Calendario {
  @IsInt()
  fnencomienda: number;

  @IsDate()
  @IsOptional()
  fdfechahoy: Date | null;

  @IsDateString()
  @Length(1, 100)
  @IsOptional()
  fcfechahoyinput: string | null;

  @Length(1, 100)
  @IsOptional()
  fcnombredia: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdia: string | null;

  @IsDate()
  @IsOptional()
  fdfechatemp: Date | null;

  @IsInt()
  @IsOptional()
  fnnrotrimestre: number | null;

  @IsDate()
  @IsOptional()
  fdproximafecha: Date | null;

  @IsDate()
  @IsOptional()
  fdfechaanterior: Date | null;

  @IsDate()
  @IsOptional()
  fdprihabmes: Date | null;

  @IsDate()
  @IsOptional()
  fdulthabmes: Date | null;

  @IsDate()
  @IsOptional()
  fdpridiames: Date | null;

  @IsDate()
  @IsOptional()
  fdultdiames: Date | null;

  @IsDate()
  @IsOptional()
  fdpridiatri: Date | null;

  @IsDate()
  @IsOptional()
  fdprihabtri: Date | null;

  @IsDate()
  @IsOptional()
  fdultdiatri: Date | null;

  @IsInt()
  @IsOptional()
  fnmesinictri: number | null;

  @IsDate()
  @IsOptional()
  fdulthabtri: Date | null;

  @IsInt()
  @IsOptional()
  fndiadesem: number | null;

  @IsInt()
  @IsOptional()
  fnmesdesem: number | null;

  @IsInt()
  @IsOptional()
  fnanodesem: number | null;

  @IsInt()
  @IsOptional()
  fncentdesem: number | null;

  @IsInt()
  @IsOptional()
  fnmesdesemnrco: number | null;

  @IsInt()
  @IsOptional()
  fnc: number | null;

  @Length(1, 100)
  @IsOptional()
  fcz: string | null;

  @IsInt()
  @IsOptional()
  fndiadelasemana: number | null;

  @IsDate()
  @IsOptional()
  fdultdiamesant: Date | null;
}
