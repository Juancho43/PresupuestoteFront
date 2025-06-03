import {Person} from './person';
import {Entity} from './entity';

export interface IPerson<IOwnable> extends Entity{
  person: Person;
  balance:number;
  things: IOwnable[];
}
