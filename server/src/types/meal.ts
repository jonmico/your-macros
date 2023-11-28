import IFood from './food';

export default interface IMeal {
  mealComponents: { food: IFood; servings: number }[];
  name: string;
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
}
