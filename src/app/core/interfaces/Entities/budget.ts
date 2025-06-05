import {IOwnable} from './IOwnable';
import {Work} from './work';
import {Client} from './client';


export interface Budget extends IOwnable{
  made_date: Date;
  description: string;
  cost: number;
  profit: number;
  dead_line: Date;
  state: string;

  works: Work[];
  client?: Client;
}

export interface BudgetRequest{
  id?: number;
  client_id: number
  made_date: Date;
  description: string;
  profit?: number;
  state?: string;
  dead_line?: Date;

}

export interface BudgetState {
  state: string[];
}
