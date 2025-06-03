import {Entity} from './entity';
import {Item} from './item';

export interface Work extends Entity{
  order: number;
  description: string;
  cost: number;
  materials: Item[];
}
