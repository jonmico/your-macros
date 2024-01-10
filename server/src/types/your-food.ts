import IFood from './food';

export default interface IYourFood {
  foodComponents: {
    food: IFood;
    servings: string;
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
