import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, Length } from 'class-validator';
import { Comparison } from '../constants';

// export class Filter {
//   @ApiProperty()
//   // @IsOptional()
//   property: string;
//   @ApiProperty({ enum: Comparison, default: Comparison.EQUAL })
//   @IsEnum(Comparison)
//   @IsOptional()
//   comparison: Comparison;
//   @ApiProperty()
//   // @IsOptional()
//   value: string;
// }

export class Filter {
  @ApiProperty()
  // @IsOptional()
  @Length(1, 100)
  property: string;

  @ApiProperty({ enum: Comparison, default: Comparison.EQUAL })
  @IsEnum(Comparison)
  // @IsOptional()
  comparison: Comparison;

  @ApiProperty()
  // @IsOptional()
  @Length(1, 200)
  value: string;

  @ApiProperty()
  @IsOptional()
  rawValue?: any; // Usado para testing

  constructor(
    property: string,
    comparison: Comparison,
    value: string,
    rawValue?: any,
  ) {
    this.property = property;
    this.comparison = comparison;
    this.value = value;
    this.rawValue = rawValue;
  }
}
