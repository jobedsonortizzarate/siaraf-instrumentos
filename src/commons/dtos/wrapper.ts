import { IsBoolean, IsInt, IsOptional, Length } from 'class-validator';
import { DeleteResult } from 'typeorm';
import { QueryParams } from './query-params';

export class Wrapper<T> {
  result: T | T[] | DeleteResult;

  @IsInt()
  readonly page: number;

  @IsInt()
  readonly itemsCount: number;

  @IsInt()
  readonly pageCount: number;

  @IsBoolean()
  readonly hasPreviousPage: boolean;

  @IsBoolean()
  readonly hasNextPage: boolean;

  @Length(1, 200)
  readonly message: string;

  @Length(0, 200)
  @IsOptional()
  readonly innerExceptionMessage?: string | null;

  @IsBoolean()
  @IsOptional()
  readonly success?: boolean = false;

  constructor(
    queryParams: QueryParams,
    itemsCount: number,
    result: T | T[] | DeleteResult,
    success: boolean | null,
    message: string,
    innerExceptionMessage?: string,
  ) {
    this.page = queryParams?.page || 1;
    this.pageCount = queryParams?.take || 0;
    this.itemsCount = itemsCount || 0;
    this.pageCount =
      this.itemsCount > 0 ? Math.ceil(this.itemsCount / this.pageCount) : 0;
    this.hasPreviousPage = this.page > 1;
    this.hasNextPage = this.page < this.pageCount;
    this.result = result;
    this.success = success || false;
    this.message = message;
    this.innerExceptionMessage = innerExceptionMessage || null;
  }
}
