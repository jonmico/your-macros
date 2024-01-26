import IFood from './food';

export default interface IMeal {
  _id: string;
  mealComponents: { food: IFood; servings: number }[];
  name: string;
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
}
