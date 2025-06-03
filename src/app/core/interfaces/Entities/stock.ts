import {Entity} from './entity';

export interface Stock extends Entity{
  date: Date;
  stock: number;
}
