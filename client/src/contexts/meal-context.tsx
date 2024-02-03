import { createContext, useState } from 'react';
import { IMealComponent } from '../types/meal-component';

interface IMealContext {
  mealComponents: IMealComponent[];
  mealName: string;
  addToMeal: (meal: IMealComponent) => void;
  removeFromMeal: (id: string) => void;
  editServings: (mealComponent: IMealComponent, newServings: number) => void;
  clearMeal: () => void;
  setMealName: React.Dispatch<React.SetStateAction<string>>;
  mealNameError: string;
  setMealNameError: React.Dispatch<React.SetStateAction<string>>;
  mealComponentsError: string;
  setMealComponentsError: React.Dispatch<React.SetStateAction<string>>;
}

export const MealContext = createContext<IMealContext>({
  mealComponents: [],
  addToMeal: () => {},
  removeFromMeal: () => {},
  editServings: () => {},
  clearMeal: () => {},
  mealName: '',
  setMealName: () => {},
  mealNameError: '',
  setMealNameError: () => {},
  mealComponentsError: '',
  setMealComponentsError: () => {},
});

interface MealProviderProps {
  children: React.ReactNode;
}

export function MealProvider(props: MealProviderProps) {
  const [mealComponents, setMealComponents] = useState<IMealComponent[]>([]);
  const [mealName, setMealName] = useState('');
  const [mealNameError, setMealNameError] = useState('');
  const [mealComponentsError, setMealComponentsError] = useState('');

  function addToMeal(mealComponent: IMealComponent) {
    setMealComponents((prevState) => [...prevState, mealComponent]);
  }

  function removeFromMeal(id: string) {
    setMealComponents((prevState) =>
      prevState.filter(({ food }) => id !== food._id)
    );
  }

  function editServings(mealComponent: IMealComponent, newServings: number) {
    const updatedMealComponents = mealComponents.map((mealComp) => {
      if (mealComponent._id === mealComp._id) {
        return { ...mealComp, servings: newServings };
      }
      return mealComp;
    });

    setMealComponents(updatedMealComponents);
  }

  function clearMeal() {
    setMealComponents([]);
  }

  const value = {
    mealComponents,
    addToMeal,
    removeFromMeal,
    editServings,
    clearMeal,
    mealName,
    setMealName,
    mealNameError,
    setMealNameError,
    mealComponentsError,
    setMealComponentsError,
  };

  return (
    <MealContext.Provider value={value}>{props.children}</MealContext.Provider>
  );
}
