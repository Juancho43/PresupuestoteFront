import {IPerson} from './IPerson';
import {Invoice} from './invoice';

export interface Supplier extends IPerson<Invoice> {
  notes: string;
}
