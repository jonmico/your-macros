import IMeal from './meal';

export default interface ILog {
  _id?: string;
  meals?: IMeal[];
  author: string;
  name: string;
  macros?: {
    carbs: number;
    fat: number;
    protein: number;
  };
  calories?: number;
  currentLog: boolean;
}
