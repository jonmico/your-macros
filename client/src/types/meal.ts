import { IMealComponent } from './meal-component';

export interface IMeal {
  mealComponents: IMealComponent[];
  name: string;
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
}
