import { useContext } from 'react';
import { EditMealContext } from '../contexts/edit-meal-context';

export default function useEditMeal() {
  const value = useContext(EditMealContext);
  if (!value) {
    throw new Error('EditMealContext accessed outside EditMealProvider');
  }
  return value;
}
