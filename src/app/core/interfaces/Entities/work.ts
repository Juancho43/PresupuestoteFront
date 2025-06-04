import {Entity} from './entity';
import {Item} from './item';

export interface Work extends Entity{
  order: number;
  name: string;
  notes: string;
  cost: number;
  state: string;
  estimated_time: number;
  dead_line: Date;
  materials: Item[];
}
