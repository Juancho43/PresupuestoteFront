import {IOwnable} from './IOwnable';
import {Work} from './work';

export interface Budget extends IOwnable{
  description: string;
  cost: number;
  profit: number;
  madeDate: Date;
  deadline: Date;
  status: string;
  works: Work[];
}
