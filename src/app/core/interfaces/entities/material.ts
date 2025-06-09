import {Entity} from './entity';
import {Subcategory} from './subcategory';
import {Measure} from './measure';
import {Price} from '@models/price';
import {Stock} from '@models/stock';

export interface Material extends Entity{
  name: string;
  description: string;
  brand: string;
  unit: number;
  color: string;
  price: Price;
  stock: Stock;
  latestStock: Stock;
  latestPrice: Price;
  subcategory: Subcategory;
  measure: Measure;
  quantity?: number;
}
