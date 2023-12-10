import { createContext, useState } from 'react';
import { IFood } from '../types/food';

export interface IFoodContext {
  selectedFood: IFood | null;
  handleSelectFood: (food: IFood) => void;
}

export const FoodContext = createContext<IFoodContext>({
  selectedFood: null,
  handleSelectFood: () => {},
});

interface FoodProviderProps {
  children: React.ReactNode;
}

export function FoodProvider(props: FoodProviderProps) {
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  function handleSelectFood(food: IFood) {
    setSelectedFood(food);
  }

  const value = { selectedFood, handleSelectFood };

  return (
    <FoodContext.Provider value={value}>{props.children}</FoodContext.Provider>
  );
}
