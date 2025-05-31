import {Entity} from './entity';
import {Person} from './person';
import {IPerson} from './IPerson';

export interface Client extends IPerson{
  balance:number;

}



let client : Client = {
  person: {
    id: 1,
    name: 'John',
    last_name: 'Doe',
    email: '',
    phone_number: '',
    address: '',
    dni: '',
    cuit: ''
  },
  id: 1,
  balance: 1000
}

