import {Entity} from '@models/entity';

export interface User extends Entity{
  name: string;
  email: string;
  role: string;
  verified: boolean;
}
