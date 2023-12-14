import { useContext } from 'react';
import { MealContext } from '../contexts/meal-context';

export function useMeals() {
  const value = useContext(MealContext);
  if (!value) {
    throw new Error('MealsContext was used outside of MealsProvider.');
  }
  return value;
}
