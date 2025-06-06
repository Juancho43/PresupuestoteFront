import {Entity} from './entity';

export interface Price extends Entity{
  date: Date;
  price: number;
}
