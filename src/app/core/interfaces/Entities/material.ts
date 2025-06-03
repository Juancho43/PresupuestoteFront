import {Entity} from './entity';
import {SubCategory} from './subcategory';

export interface Material extends Entity{
  name: string;
  subcategory: SubCategory;

}
