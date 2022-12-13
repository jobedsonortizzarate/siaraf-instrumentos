export class MathUtils {
  private static round(method: string, number: any, precision: number): number {
    if (typeof number !== 'number') {
      throw new TypeError('Expected value to be a number');
    }

    if (precision === Number.POSITIVE_INFINITY) {
      return number;
    }

    if (!Number.isInteger(precision)) {
      throw new TypeError('Expected precision to be an integer');
    }

    const isRoundingAndNegative = method === 'round' && number < 0;
    if (isRoundingAndNegative) {
      number = Math.abs(number);
    }

    const power = 10 ** precision;

    let result = Math[method]((number * power).toPrecision(15)) / power;

    if (isRoundingAndNegative) {
      result = -result;
    }

    return result;
  }

  static roundTo(number: any, precision: number): number {
    return MathUtils.round('round', number, precision);
  }

  static roundToUp(number: any, precision: number): number {
    return MathUtils.round('ceil', number, precision);
  }

  static roundToDown(number: any, precision: number): number {
    return MathUtils.round('floor', number, precision);
  }
}
