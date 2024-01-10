import { ILog } from './log';
import { IMacros } from './macros';
import { IYourFood } from './your-food';

export interface IUser {
  _id: string;
  email: string;
  logs: ILog[];
  calories: number;
  macros: IMacros;
  yourFoods: IYourFood[];
}
