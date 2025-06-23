import {Entity} from './entity';
import {Subcategory} from './subcategory';
import {Measure} from './measure';
import {Price} from '@models/price';
import {Stock} from '@models/stock';
import {Work} from '@models/work';
import {Invoice} from '@models/invoice';

export interface Material extends Entity{
  name: string;
  description: string;
  brand: string;
  color: string;
  prices?: Price[];
  stocks?: Stock[];
  latestStock: Stock;
  latestPrice: Price;
  subcategory: Subcategory;
  measure: Measure;
  quantity?: number;
  works? : Work[];
  invoices? : Invoice[];
  unit_measure?: number;

}


export interface MaterialRequest{
  id?: number;
  name: string;
  description: string;
  brand: string;
  color: string;
  sub_category_id: number;
  measure_id: number;
  unit_measure: number;
}
