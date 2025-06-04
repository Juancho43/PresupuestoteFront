import {Person} from './person';
import {Entity} from './entity';

export interface IPerson extends Entity{
  person: Person;
  balance?: number;

}
