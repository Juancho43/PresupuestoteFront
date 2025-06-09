import {Entity} from './entity';
import {Material} from '@models/material';
import {Budget} from '@models/budget';

export interface Work extends Entity{
  order: number;
  name: string;
  notes: string;
  cost: number;
  state: string;
  estimated_time: number;
  dead_line: Date;
  materials: Material[];
  budget?:Budget;
}
export interface WorkRequest {
  id?:number;
  order: number;
  name: string;
  notes: string;
  estimated_time: number;
  dead_line: Date;
  budget_id: number;
  state?: string;
}
export interface AddMaterialsToWorkRequest{
  work_id: number;
  materials: {
    id: number;
    quantity: number;
  }[];
}


