import {Entity} from './entity';
import {Category} from './category';

export interface Subcategory extends Entity{
  name:string;
  category: Category;
}
