import { IsEnum, Length } from 'class-validator';
import { Order } from '../constants';

export class Sort {
  @Length(1, 100)
  property: string;

  @IsEnum(Order)
  direction: Order;
}
