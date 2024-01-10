import { IFood } from './food';

export interface IYourFood {
  foodComponents: {
    food: IFood;
    servings: number;
  }[];
  author: string;
  name: string;
  servingSize: string;
  calories: number;
  macros: {
    fat: number;
    carbs: number;
    protein: number;
  };
}
