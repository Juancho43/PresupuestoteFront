import {IOwnable} from './IOwnable';

export interface Salary extends IOwnable{
  amount: number;
  active: boolean;
}

export interface SalaryRequest {
  id?: number;
  active: boolean;
  amount: number;
  date: Date;
  employeeId: number;
}
