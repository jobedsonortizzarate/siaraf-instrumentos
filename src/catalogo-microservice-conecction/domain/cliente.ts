import { IsDate, IsInt, IsOptional, Length } from 'class-validator';

export class Cliente {
  @IsInt()
  fnencomienda: number;

  @IsInt()
  fnbanco: number;

  @IsInt()
  fncliente: number; // TODO Checar tamaño y tipo

  @IsInt()
  fnsujeto: number; // TODO Checar tamaño y tipo

  @IsInt()
  @IsOptional()
  fncveorg: number | null;

  @Length(1, 100)
  @IsOptional()
  fcnombrefull: string | null;

  @Length(1, 100)
  @IsOptional()
  fcnombre: string | null;

  @Length(1, 100)
  @IsOptional()
  fcnombre2: string | null;

  @Length(1, 100)
  @IsOptional()
  fcapellido: string | null;

  @Length(1, 100)
  @IsOptional()
  fcapellido2: string | null;

  @Length(1, 100)
  @IsOptional()
  fchomonimo: string | null;

  @Length(1, 100)
  @IsOptional()
  fchomonimosec: string | null;

  @Length(1, 100)
  @IsOptional()
  fcrepresentante: string | null;

  @Length(1, 100)
  @IsOptional()
  fctpident: string | null;

  @Length(1, 100)
  @IsOptional()
  fcnumident: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdireccion1: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdireccion2: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdirecc2bis1: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdirecc2bis2: string | null;

  @Length(1, 100)
  @IsOptional()
  fccodigopostal: string | null;

  @Length(1, 100)
  @IsOptional()
  fccolonia: string | null;

  @IsInt()
  @IsOptional()
  fnactividad: number | null;

  @IsInt()
  @IsOptional()
  fncodpais: number | null;

  @IsInt()
  @IsOptional()
  fncodciudad: number | null;

  @Length(1, 100)
  @IsOptional()
  fctelex: string | null;

  @Length(1, 100)
  @IsOptional()
  fcfax: string | null;

  @Length(1, 100)
  @IsOptional()
  fcsexo: string | null;

  @Length(1, 100)
  @IsOptional()
  fcestadocivil: string | null;

  @IsInt()
  @IsOptional()
  fnnacionalidad: number | null;

  @Length(1, 100)
  @IsOptional()
  fcinscrpp: string | null;

  @Length(1, 100)
  @IsOptional()
  fcescriturapub: string | null;

  @IsDate()
  @IsOptional()
  fdfechaescpub: Date | null;

  @IsInt()
  @IsOptional()
  fncapitalsocial: number | null;

  @Length(1, 100)
  @IsOptional()
  fctelefono1: string | null;

  @Length(1, 100)
  @IsOptional()
  fctelefono2: string | null;

  @Length(1, 100)
  @IsOptional()
  fcrfc1: string | null;

  @IsInt()
  @IsOptional()
  fntpcliente: number | null;

  @IsInt()
  @IsOptional()
  fgintegracion: number | null;

  @Length(1, 100)
  @IsOptional()
  fcocupacion: string | null;

  @IsInt()
  @IsOptional()
  fgmasdireccion: number | null;

  @IsInt()
  @IsOptional()
  fnfechanacimto: number | null;

  @IsInt()
  @IsOptional()
  fnoficinaresp: number | null;

  @Length(1, 100)
  @IsOptional()
  fcencargado: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdepresp: string | null;

  @Length(1, 100)
  @IsOptional()
  fccorrespond: string | null;

  @Length(1, 100)
  @IsOptional()
  fctipodefirma: string | null;

  @Length(1, 100)
  @IsOptional()
  fcdiv: string | null;

  @IsInt()
  @IsOptional()
  fnsegmento: number | null;

  @Length(1, 100)
  @IsOptional()
  fcpoblacion: string | null;

  @IsInt()
  @IsOptional()
  fnsector: number | null;

  @Length(1, 100)
  @IsOptional()
  fcestimulo1: string | null;

  @Length(1, 100)
  @IsOptional()
  fcestimulo2: string | null;

  @IsInt()
  @IsOptional()
  fnfigjuridica: number | null;

  @IsInt()
  @IsOptional()
  fnsectorten: number | null;

  @IsInt()
  @IsOptional()
  fntpoproductor1: number | null;

  @IsInt()
  @IsOptional()
  fntpoproductor2: number | null;

  @IsInt()
  @IsOptional()
  fnsuperficie: number | null;

  @Length(1, 100)
  @IsOptional()
  fccvefte1: string | null;

  @Length(1, 100)
  @IsOptional()
  fccvefte2: string | null;

  @Length(1, 100)
  @IsOptional()
  fccvefte3: string | null;

  @Length(1, 100)
  @IsOptional()
  fccvefte4: string | null;

  @Length(1, 100)
  @IsOptional()
  fccvefte5: string | null;

  @IsInt()
  @IsOptional()
  fnnumfte1: number | null;

  @IsInt()
  @IsOptional()
  fnnumfte2: number | null;

  @IsInt()
  @IsOptional()
  fnnumfte3: number | null;

  @IsInt()
  @IsOptional()
  fnnumfte4: number | null;

  @IsInt()
  @IsOptional()
  fnnumfte5: number | null;

  @Length(1, 100)
  @IsOptional()
  fcnivel12: string | null;

  @IsInt()
  @IsOptional()
  fgprotect: number | null;

  @IsInt()
  @IsOptional()
  fgguarda: number | null;

  @IsInt()
  @IsOptional()
  fnsistema1: number | null;

  @IsInt()
  @IsOptional()
  fnsistema2: number | null;

  @IsInt()
  @IsOptional()
  fnsistema3: number | null;

  @IsInt()
  @IsOptional()
  fgforo: number | null;

  @Length(1, 100)
  @IsOptional()
  fcrefcobro: string | null;

  @IsInt()
  @IsOptional()
  fnentidadfederativa: number | null;

  @Length(1, 100)
  @IsOptional()
  fccurp: string | null;

  @IsDate()
  @IsOptional()
  fdfechaautforo: Date | null;

  @IsDate()
  @IsOptional()
  fdfechaplazoforo: Date | null;

  @IsInt()
  @IsOptional()
  fnpagopropforo: number | null;

  @IsInt()
  @IsOptional()
  fntipodev: number | null;
}
