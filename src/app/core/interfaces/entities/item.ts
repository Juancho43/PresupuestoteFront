import {Material} from './material';
import {Price} from './price';
import {Stock} from './stock';

export interface Item{
  material: Material;
  quantity: number;
  price: Price;
  stock : Stock;

}
