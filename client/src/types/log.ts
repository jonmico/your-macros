import { IMeal } from './meal';

export interface ILog {
  _id: string;
  meals?: IMeal[];
  author: string;
  name: string;
  macros?: {
    carbs: number;
    fat: number;
    protein: number;
  };
  calories?: number;
}
