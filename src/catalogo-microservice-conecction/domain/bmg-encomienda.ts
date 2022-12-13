import { IsInt, IsOptional, Length } from 'class-validator';

export class BmgEncomienda {
  @IsInt()
  fnencomienda: number;

  @Length(1, 100)
  @IsOptional()
  fcnombre: string | null;

  @Length(1, 100)
  @IsOptional()
  fcbasefisica: string | null;

  @Length(1, 100)
  @IsOptional()
  fcservicio: string | null;

  @Length(1, 100)
  @IsOptional()
  fccvegv: string | null;

  @Length(1, 100)
  @IsOptional()
  fcnombre2: string | null;
}
