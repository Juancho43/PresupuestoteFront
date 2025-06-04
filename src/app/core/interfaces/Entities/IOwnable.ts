import {Entity} from './entity';
import {Payment} from './payment';
export interface IOwnable extends Entity {
  description: string;
  total:number;
  payments: Payment[]
  payment_status: string;
}
