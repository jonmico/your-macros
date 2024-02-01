import { useContext } from 'react';
import { EditMealContext } from '../contexts/edit-meal-context';

export function useEditMeals() {
  const value = useContext(EditMealContext);

  if (!value) {
    throw new Error('EditMealsContext used outside of EditMealsProvider');
  }

  return value;
}
