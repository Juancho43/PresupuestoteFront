import {IPerson} from './IPerson';
import {Invoice} from './invoice';

export interface Supplier extends IPerson{
  notes: string;
  invoices: Invoice[];
}
