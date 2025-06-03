import {IPerson} from './IPerson';
import {Salary} from './salary';

export interface Employee extends IPerson<Salary>{
  active:boolean;
}
