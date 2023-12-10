import { useContext } from 'react';
import { FoodContext } from '../contexts/food-context';

export function useFoods() {
  const value = useContext(FoodContext);
  if (!value) {
    throw new Error('FoodContext used outside of provider.');
  }
  return value;
}
