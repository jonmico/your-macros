import { createContext, useState } from 'react';

interface IEditMealContext {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultState = {
  isEditing: false,
  setIsEditing: () => {},
};

export const EditMealContext = createContext<IEditMealContext>(defaultState);

export function EditMealProvider(props: { children: React.ReactNode }) {
  const [isEditing, setIsEditing] = useState(false);
  const value = { isEditing, setIsEditing };
  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
