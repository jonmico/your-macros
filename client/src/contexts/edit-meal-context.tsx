import { SetStateAction, createContext, useState } from 'react';
import { IMeal } from '../types/meal';
import { IFood } from '../types/food';

interface IEditMealContext {
  mealToEdit: IMeal | null;
  setMealToEdit: React.Dispatch<SetStateAction<IMeal | null>>;
  logId: string;
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
  searchedFoods: IFood[];
  setSearchedFoods: React.Dispatch<SetStateAction<IFood[]>>;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: {
  children: React.ReactNode;
  logId: string;
}) {
  const [mealToEdit, setMealToEdit] = useState<IMeal | null>(null);
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [searchInput, setSearchInput] = useState('');

  const value = {
    mealToEdit,
    setMealToEdit,
    logId: props.logId,
    searchedFoods,
    setSearchedFoods,
    searchInput,
    setSearchInput,
  };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
