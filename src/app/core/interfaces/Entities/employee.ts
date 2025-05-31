
import {IPerson} from './IPerson';

export interface Employee extends IPerson{
  balance:number;
  active:boolean;
}
