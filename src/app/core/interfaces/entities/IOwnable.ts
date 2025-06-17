import {Entity} from './entity';
import {Payment} from './payment';
import {IPerson} from '@models/IPerson';

export interface IOwnable extends Entity {
  description: string;
  date: Date;
  total:number;
  payments: Payment[]
  payment_status: string;
  owner?: IPerson;
}

export enum Pagables{
  Boleta = 'Boleta',
  Salario = 'Salario',
  Presupuesto = 'Presupuesto'
}

export enum payableEntity{
  Invoice = 'invoice',
  Salary = 'salary',
  Budget = 'budget'
}


export enum Payables{
  Invoice = 'App\\Models\\Invoice',
  Salary = 'App\\Models\\Salary',
  Budget = 'App\\Models\\Budget'
}

