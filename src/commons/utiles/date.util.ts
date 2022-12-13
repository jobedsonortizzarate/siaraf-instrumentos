import { MathUtils } from './math.service';

export class FechaUtiles {
  private static readonly semanaFines = [
    { diaNombre: 'sábado', diasResta: -1, diasSuma: 2 },
    { diaNombre: 'Sábado', diasResta: -1, diasSuma: 2 },
    { diaNombre: 'saturday', diasResta: -1, diasSuma: 2 },
    { diaNombre: 'Saturday', diasResta: -1, diasSuma: 2 },

    { diaNombre: 'domingo', diasResta: -2, diasSuma: 1 },
    { diaNombre: 'Domingo', diasResta: -2, diasSuma: 1 },
    { diaNombre: 'sunday', diasResta: -2, diasSuma: 1 },
    { diaNombre: 'Sunday', diasResta: -2, diasSuma: 1 },
  ];
  private static readonly errorSemanaFines = [
    { diaNombre: 'domingo', diasResta: -2, diasSuma: 1 },
    { diaNombre: 'Domingo', diasResta: -2, diasSuma: 1 },
    { diaNombre: 'sunday', diasResta: -2, diasSuma: 1 },
    { diaNombre: 'Sunday', diasResta: -2, diasSuma: 1 },
  ];
  // private static readonly localeLanguge: string = 'es-MX';
  private static readonly localeLanguge: string =
    process.env.TZ === 'UTC' ? 'UTC' : 'es-MX';
  //los periodos por ahora son de 3 meses
  private static readonly mesesPeriodo = 3;
  private static readonly mesesAnio = 12;
  // constructor();
  //retorna el mes de una fecha el cual puede ser numerico o de 2 digitos segun el parametro
  static getMonthFormat(date: any, returnNumber = false): any {
    const newDate = new Date(date);
    // const newDate = dayjs(date).utc(true);
    const format = returnNumber ? 'numeric' : '2-digit';
    // return returnNumber ? newDate.month() : newDate.format('MM');
    return newDate.toLocaleString(this.localeLanguge, {
      month: format,
    });
  }
  //retorna el dia de una fecha el cual puede ser numerico o de 2 digitos segun el parametro
  static getDayFormat(date: any, returnNumber = false): any {
    // const newDate = dayjs(date).utc(true);
    const newDate = new Date(date);
    const format = returnNumber ? 'numeric' : '2-digit';

    return newDate.toLocaleString(this.localeLanguge, {
      day: format,
    });
    // return returnNumber ? newDate.day() : newDate.format('DD');
  }
  //retorna el nombre dia de una fecha
  static getWeekDayNameDigitsFormat(date: any): string {
    const newDate = new Date(date);
    return newDate.toLocaleString(this.localeLanguge, { weekday: 'long' });
  }
  //retorna el año de una fecha el cual puede ser numerico(4 digitos) o de 2 digitos segun el parametro
  static getYearFormat(date: any, return2Digits = false): string {
    const newDate = new Date(date);
    const format = return2Digits ? '2-digit' : 'numeric';
    return newDate.toLocaleString(this.localeLanguge, { year: format });
  }
  //retorna el centenar del año de una fecha en una cadena de 2 digitos
  static getYearCentury2DigitsFormat(date: any): string {
    const newDate = new Date(date);
    return newDate.getFullYear().toString().substring(0, 2);
  }
  //retorna la fecha dada aumentando los dias indicados en el parametros days(el valor puede ser negativo)
  static addDays(date: any, days: number): Date {
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + days);
    return newDate;
  }
  //retorna la fecha dada aumentando los meses indicados en el parametros months(el valor puede ser negativo)
  static addMonth(date: any, months: number): Date {
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }
  //retorna la fecha dada aumentando los años indicados en el parametros years(el valor puede ser negativo)
  static addYears(date: any, years: number): Date {
    const newDate = new Date(date);
    newDate.setFullYear(newDate.getFullYear() + years);
    return newDate;
  }
  //retorna el primer dia del mes de la fecha dada
  static getFirstDayOfMonth(date: any): Date {
    const newDate = new Date(date);
    newDate.setDate(1);
    return newDate;
  }
  //retorna el ultimo dia del mes la fecha dada
  static getLastDayOfMonth(date: any): Date {
    const newDate = new Date(date);
    newDate.setDate(1);
    newDate.setMonth(newDate.getMonth() + 1);
    newDate.setDate(newDate.getDate() - 1);
    return newDate;
  }
  //retorna de una fecha dada
  // getFechaFechaHabil(date: Date): Date {}
  //ultimo dia habil(UltimoHabil_scia0022)
  // static getUltimoDiaHabil(date: any): Date {
  //   //checar si es fin de semana y de ser asi regresar hasta el viernes
  //   //verificar en calendarios si la fechha esta agendada comoo feriada y de ser asi regresarla 1 dia de una fecha
  //   //checar si es fin de semana y de ser asi regresar hasta el viernes
  // }
  //retorna el ultimo viernes en caso de ser fin de semana, si no retorna la fecha dada
  static getUltimoDiaHabilSemana(date: any): Date {
    const newDate = new Date(date);
    const diaNombre = newDate.toLocaleString(this.localeLanguge, {
      weekday: 'long',
    });

    /**TODO: Adaptado para el error de SP en [UltimoHabil_scia0022] ('Sabado' sin acento en la a primera (nunca entra))
     * En caso de correccion descomentar la seccion que utiliza semanaFines y comentar la que utiliza errorSemanaFines
     */

    // const finSemanaDia = this.semanaFines.find((semanaFin) => {
    //   return diaNombre === semanaFin.diaNombre ? semanaFin : null;
    // });

    //adaptado al error de SP
    const finSemanaDia = this.errorSemanaFines.find((semanaFin) => {
      return diaNombre === semanaFin.diaNombre ? semanaFin : null;
    });

    if (finSemanaDia)
      newDate.setDate(newDate.getDate() + finSemanaDia.diasResta);
    return newDate;
  }
  //retorna el proximo lunes en caso de ser fin de semana
  static getProximoDiaHabilSemana(date: any): Date {
    const newDate = new Date(date);
    const diaNombre = newDate.toLocaleString(this.localeLanguge, {
      weekday: 'long',
    });
    const finSemanaDia = this.semanaFines.find((semanaFin) => {
      return diaNombre === semanaFin.diaNombre ? semanaFin : null;
    });
    if (finSemanaDia)
      newDate.setDate(newDate.getDate() + finSemanaDia.diasSuma);
    return newDate;
  }
  //obtiene la fecha dada con formato dd/mm/yyyy
  static getShortFormat(date: any): any {
    const newDate = new Date(date);
    return newDate.toLocaleString(this.localeLanguge, { dateStyle: 'short' });
    // return dayjs(date).format(format ? format : 'YYYY-MM-DD');
  }
  static getTimeFormat(date: any) {
    const newDate = new Date(date);
    return newDate.toLocaleString(this.localeLanguge, { timeStyle: 'short' });
  }
  //retorna un boleano que indica co verdadero si la fecha dada es fin de semana
  static esFinDeSemana(date: any): boolean {
    const newDate = new Date(date);
    const diaNombre = newDate.toLocaleString(this.localeLanguge, {
      weekday: 'long',
    });
    const finSemanaDia = this.semanaFines.find((semanaFin) => {
      return diaNombre === semanaFin.diaNombre ? semanaFin : null;
    });
    return finSemanaDia ? true : false;
  }
  //retorna el primer dia del periodo de una fecha dada
  static getPrimerDiaPeriodo(date: any): Date {
    const newDate = new Date(date);
    const periodoNumero = this.getNumeroPeriodo(newDate);
    const primerMesPeriodo = periodoNumero * this.mesesPeriodo;
    //los meses por default en new date inician del 0, por lo que hay que quitarle 1 mes
    return new Date(newDate.getFullYear(), primerMesPeriodo, 1);
  }
  //retorna el ultimo dia del periodo de una fecha dada
  static getUltimoDiaPeriodo(date: any): Date {
    const newDate = new Date(date);
    const periodoNumero = this.getNumeroPeriodo(newDate);
    const ultimoMesPeriodo =
      periodoNumero * this.mesesPeriodo + this.mesesPeriodo;
    //los meses por default en new date inician del 0, por lo que hay que quitarle 1 mes
    if (ultimoMesPeriodo !== 12) {
      return FechaUtiles.addDays(
        new Date(newDate.getFullYear(), ultimoMesPeriodo, 1),
        -1,
      );
    } else {
      return new Date(newDate.getFullYear(), 0, 1);
    }
  }
  //retorna el numero de periodo de una fecha dada
  static getNumeroPeriodo(date: any): number {
    // Logger.debug('FechaUtiles:getNumeroPeriodo: ', date);
    const newDate = new Date(date);
    // return MathUtils.roundToDown(
    //   +this.getMonthFormat(newDate, true) / this.mesesPeriodo,
    //   0,
    // );

    //cambio cierre-mensual
    return MathUtils.roundToDown(
      (+this.getMonthFormat(newDate, true) - 1) / this.mesesPeriodo,
      0,
    );
    // return Number(FechaUtiles.getMonthFormat(newDate, true));
  }
  //retorna la fecha y hora de ahora
  static getNow(): Date {
    const now = new Date();
    // Logger.debug(`antes de convertirlo a date: ${now}`);
    return now;
  }
  static getTimeNow(): string {
    const now = new Date();
    // Logger.debug(`antes de convertirlo a date: ${now}`);
    return now.toLocaleString(this.localeLanguge, { timeStyle: 'medium' });
  }
  //retorna la fecha dada en formato apto para el guardado en BD
  static getUTCDateBDFormat(date: any): string {
    const newDate = new Date(date);
    const dateString = `${newDate.getUTCFullYear()}-${(
      newDate.getUTCMonth() + 1
    )
      .toString()
      .padStart(2, '0')}-${newDate
      .getUTCDate()
      .toString()
      .padStart(2, '0')} ${newDate
      .getUTCHours()
      .toString()
      .padStart(2, '0')}:${newDate
      .getUTCMinutes()
      .toString()
      .padStart(2, '0')}:${newDate
      .getUTCSeconds()
      .toString()
      .padStart(2, '0')}`;
    // return `${this.getDayFormat(date)} ${this.getTimeFormat(date)}`;
    return dateString;
    // return newDate.toUTCString();
  }
  static toDate(date: any): Date {
    return new Date(date);
  }
  static rectificaFecha(fecha: any) {
    if (typeof fecha === 'object') fecha = fecha.toString();
    const gmt = new Date(`${fecha}`).toTimeString().slice(12, 17);
    return new Date(`${fecha}T00:00:00${gmt}`);
  }

  static getNombreDiaSemana(date: any) {
    const dia = this.addDays(new Date(date), 0);
    const nombreDia = dia.toLocaleString(this.localeLanguge, {
      weekday: 'long',
    });
    return nombreDia;
  }
}
