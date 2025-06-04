import {Entity} from './entity';
import {Subcategory} from './subcategory';
import {Measure} from './measure';

export interface Material extends Entity{
  name: string;
  subcategory: Subcategory;
  measure: Measure;
}
