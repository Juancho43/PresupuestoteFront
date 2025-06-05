import {IOwnable} from './IOwnable';
import {Work} from './work';
import {Client} from './client';

export interface Budget extends IOwnable{
  description: string;
  cost: number;
  profit: number;
  made_date: Date;
  dead_line: Date;
  state: string;

  works: Work[];
  client?: Client;
}
