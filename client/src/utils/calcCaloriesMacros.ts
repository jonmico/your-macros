import { IFood } from '../types/food';

export function calcCaloriesMacros(
  foodComponents: { food: IFood; servings: number }[]
) {
  const totalCals = foodComponents.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );
  const totalFat = foodComponents.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );
  const totalCarbs = foodComponents.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );
  const totalProtein = foodComponents.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );

  return { totalCals, totalFat, totalCarbs, totalProtein };
}
