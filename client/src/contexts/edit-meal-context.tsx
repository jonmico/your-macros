import { SetStateAction, createContext, useState } from 'react';
import { IMeal } from '../types/meal';

interface IEditMealContext {
  mealToEdit: IMeal | null;
  setMealToEdit: React.Dispatch<SetStateAction<IMeal | null>>;
  logId: string;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: {
  children: React.ReactNode;
  logId: string;
}) {
  const [mealToEdit, setMealToEdit] = useState<IMeal | null>(null);

  const value = { mealToEdit, setMealToEdit, logId: props.logId };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
