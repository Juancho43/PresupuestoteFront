import {Entity} from './entity';
import {Payables} from '@models/IOwnable';

export interface Payment extends Entity{
  date : Date,
  amount: number,
  description : string,
  payable_id: number;
  payable_type: Payables;
}

