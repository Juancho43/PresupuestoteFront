import {Entity} from './entity';

export interface Payment extends Entity{
  date : Date,
  amount: number,
  description : string,
}
