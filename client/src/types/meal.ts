// import { IMealComponent } from './meal-component';

interface BackendMealComponent {
  food: string;
  servings: number;
}

export default interface IMeal {
  mealComponents: BackendMealComponent[];
  name: string;
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
}
