import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../constants';
import { Filter } from './filter';

export class QueryParams {
  @ApiPropertyOptional({ minimum: 1, default: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @ApiPropertyOptional({ minimum: 1, maximum: 50, default: 20 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(200)
  // @IsOptional()
  take: number;

  @ApiPropertyOptional({ enum: Order, default: Order.DESC })
  @IsEnum(Order)
  // @IsOptional()
  order: Order;

  @ApiPropertyOptional()
  @IsOptional()
  orderColumn: string | undefined;

  @ApiPropertyOptional()
  @IsArray()
  @IsOptional()
  filters: Filter[] | undefined;

  get skip(): number {
    return (this.page - 1) * this.take;
  }

  constructor(
    order: Order,
    page: number,
    take: number,
    filters?: Filter[],
    orderColumn?: string,
  ) {
    this.order = order;
    this.page = page;
    this.take = take;
    this.filters = filters;
    this.orderColumn = orderColumn;
  }
}
