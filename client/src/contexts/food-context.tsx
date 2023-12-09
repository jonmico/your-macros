import { createContext, useContext, useState } from 'react';
import { IFood } from '../types/food';

interface IFoodContext {
  selectedFood: IFood | null;
  handleSelectFood: (food: IFood) => void;
}

const FoodContext = createContext<IFoodContext | null>(null);

interface FoodProviderProps {
  children: React.ReactNode;
}

export function FoodProvider(props: FoodProviderProps) {
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  function handleSelectFood(food: IFood) {
    setSelectedFood(food);
  }

  return (
    <FoodContext.Provider value={{ selectedFood, handleSelectFood }}>
      {props.children}
    </FoodContext.Provider>
  );
}

export function useFoods() {
  const value = useContext(FoodContext);
  if (!value) {
    throw new Error('FoodContext was used outside the FoodProvider.');
  }
  return value;
}
