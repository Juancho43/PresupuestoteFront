import {IPerson} from './IPerson';
import {Budget} from './budget';

export interface Client extends IPerson{
  budgets?: Budget[];

}
