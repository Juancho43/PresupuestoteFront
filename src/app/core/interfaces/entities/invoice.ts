import {IOwnable} from './IOwnable';
import {Material} from '@models/material';

export interface Invoice extends IOwnable{
  materials: Material[];
}
export interface InvoiceRequest{
  id?: number;
  supplier_id: number;
  date: Date;
  description: string;
}
export interface AddMaterialsToInvoiceRequest{
  invoice_id: number;
  materials: {
    id: number;
    quantity: number;
    price: number;
  }[];
}
