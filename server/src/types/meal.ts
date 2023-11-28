import IFood from './food';

export default interface IMeal {
  mealComponents: { food: IFood; servings: number }[];
}
