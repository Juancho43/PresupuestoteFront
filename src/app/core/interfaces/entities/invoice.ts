import {IOwnable} from './IOwnable';

export interface Invoice extends IOwnable{
  date: Date;
}
export interface InvoiceRequest{
  id?: number;
  date: Date;
  supplier_id: number;
}
