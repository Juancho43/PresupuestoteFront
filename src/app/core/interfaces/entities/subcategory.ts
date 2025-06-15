import {Entity} from './entity';
import {Category} from './category';

export interface Subcategory extends Entity{
  name:string;
  category: Category;
}
export interface SubCategoryRequest{
  id?: number;
  name: string;
  category_id: number;
}
