import {Entity} from './entity';

export interface Person extends Entity{
  name:string;
  last_name:string;
  email:string;
  phone_number:string;
  address:string;
  dni:string;
  cuit:string;
}
