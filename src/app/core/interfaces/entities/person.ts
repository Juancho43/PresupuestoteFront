import {Entity} from './entity';

export interface Person extends Entity{
  name:string;
  last_name:string;
  mail:string;
  phone_number:string;
  address:string;
  dni:string;
  cuit:string;
}
