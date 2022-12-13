import { AggregateRoot } from '@nestjs/cqrs';

export interface BaseModel<T> extends AggregateRoot {
  properties: () => T;
  compareId: (id: any) => boolean;
  commit: () => void;
  update(preoperties: any): void;
}
