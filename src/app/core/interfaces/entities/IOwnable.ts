import {Entity} from './entity';
import {Payment} from './payment';
import {IPerson} from '@models/IPerson';

export interface IOwnable extends Entity {
  description: string;
  date: Date;
  total:number;
  payments: Payment[]
  payment_status: string;
  owner?: IPerson;
}
