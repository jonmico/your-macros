import IMeal from './meal';
import IUser from './user';

export default interface ILog {
  meals?: IMeal[];
  author: IUser;
  name: string;
  macros?: {
    carbs: number;
    fat: number;
    protein: number;
  };
  calories?: number;
}
