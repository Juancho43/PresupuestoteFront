import {IPerson} from './IPerson';
import {Salary} from './salary';

export interface Employee extends IPerson{
  is_active:boolean;
  salary: number;
  start_date: Date;
  end_date?: Date;
  salaries?: Salary[];
}
