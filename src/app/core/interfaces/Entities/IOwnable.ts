import {Entity} from './entity';
import {Payments} from './payments';

export interface IOwnable extends Entity {
  payments: Payments[];
  payment_status: string;

}
