import { createContext, useState } from 'react';
import { IFood } from '../types/food';

export interface IFoodContext {
  selectedFood: IFood | null;
  handleSelectFood: (food: IFood) => void;
  clearSelectedFood: () => void;
}

export const FoodContext = createContext<IFoodContext>({
  selectedFood: null,
  handleSelectFood: () => {},
  clearSelectedFood: () => {},
});

interface FoodProviderProps {
  children: React.ReactNode;
}

export function FoodProvider(props: FoodProviderProps) {
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  function handleSelectFood(food: IFood) {
    setSelectedFood(food);
  }

  function clearSelectedFood() {
    setSelectedFood(null);
  }

  const value = { selectedFood, handleSelectFood, clearSelectedFood };

  return (
    <FoodContext.Provider value={value}>{props.children}</FoodContext.Provider>
  );
}
