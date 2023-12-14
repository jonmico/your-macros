import { createContext, useState } from 'react';
import { IMealComponent } from '../types/meal-component';

export interface IMealContext {
  mealComponents: IMealComponent[];
  addToMeal: (meal: IMealComponent) => void;
  removeFromMeal: (id: string) => void;
  editServings: (mealComponent: IMealComponent, newServings: number) => void;
}

export const MealContext = createContext<IMealContext>({
  mealComponents: [],
  addToMeal: () => {},
  removeFromMeal: () => {},
  editServings: () => {},
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

  function editServings(mealComponent: IMealComponent, newServings: number) {
    const index = mealComponents.findIndex(
      (mealComp) => mealComponent.food._id === mealComp.food._id
    );

    const newMealComponent: IMealComponent = {
      ...mealComponent,
      servings: newServings,
    };

    // Copy array.
    const mealComponentsCopy = mealComponents.slice();

    // Remove index of the meal component we are editing.
    // Replace with meal component with updated servings.
    mealComponentsCopy.splice(index, 1, newMealComponent);

    // Change state to copy of meal components array with updated servings.
    setMealComponents(mealComponentsCopy);
  }

  const value = { mealComponents, addToMeal, removeFromMeal, editServings };
  return (
    <MealContext.Provider value={value}>{props.children}</MealContext.Provider>
  );
}
