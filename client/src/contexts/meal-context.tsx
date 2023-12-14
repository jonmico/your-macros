import { createContext, useState } from 'react';
import { IMealComponent } from '../types/meal-component';

export interface IMealContext {
  mealComponents: IMealComponent[];
  addToMeal: (meal: IMealComponent) => void;
  removeFromMeal: (id: string) => void;
}

export const MealContext = createContext<IMealContext>({
  mealComponents: [],
  addToMeal: () => {},
  removeFromMeal: () => {},
});

interface MealProviderProps {
  children: React.ReactNode;
}

export function MealProvider(props: MealProviderProps) {
  const [mealComponents, setMealComponents] = useState<IMealComponent[]>([]);

  function addToMeal(mealComponent: IMealComponent) {
    setMealComponents((prevState) => [...prevState, mealComponent]);
  }

  function removeFromMeal(id: string) {
    setMealComponents((prevState) =>
      prevState.filter(({ food }) => id !== food._id)
    );
  }

  const value = { mealComponents, addToMeal, removeFromMeal };
  return (
    <MealContext.Provider value={value}>{props.children}</MealContext.Provider>
  );
}
