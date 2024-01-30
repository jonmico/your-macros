import { createContext } from 'react';

interface IEditMealContext {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  isEditing: false,
  setIsEditing: () => {},
};

export const EditMealContext = createContext<IEditMealContext>(defaultState);
