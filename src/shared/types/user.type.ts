import { UserType } from '../const.js';

export type User = {
  name: string;
  email: string;
  avatar?: string;
  password: string;
  type: UserType;
}
