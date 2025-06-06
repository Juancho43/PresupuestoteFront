import {Entity} from './entity';
import {Payment} from './payment';
import {Client} from '@models/client';
import {IPerson} from '@models/IPerson';

export interface IOwnable extends Entity {
  description: string;
  total:number;
  payments: Payment[]
  payment_status: string;
  owner?: IPerson;
}
