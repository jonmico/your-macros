import IFood from './food';

export default interface IYourFood {
  foodComponents: {
    food: IFood;
    servings: string;
  }[];
  _id: string;
  name: string;
  serving: string;
  calories: number;
  macros: {
    fat: number;
    carbs: number;
    protein: number;
  };
}
