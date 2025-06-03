import {Entity} from './entity';
import {Category} from './category';

export interface SubCategory extends Entity{
  name:string;
  category: Category;
}
