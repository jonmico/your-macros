import ILog from './log';
import IYourFood from './your-food';

export default interface IUser {
  email: string;
  password: string;
  logs: ILog[];
  calories: number;
  macros: {
    fat: number;
    carbs: number;
    protein: number;
  };
  yourFoods: IYourFood[];
}
