import { SetStateAction, createContext, useState } from 'react';
import { IMeal } from '../types/meal';

interface IEditMealContext {
  mealToEdit: IMeal | null;
  setMealToEdit: React.Dispatch<SetStateAction<IMeal | null>>;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: { children: React.ReactNode }) {
  const [mealToEdit, setMealToEdit] = useState<IMeal | null>(null);

  const value = { mealToEdit, setMealToEdit };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
