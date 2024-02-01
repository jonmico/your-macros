import { createContext, useState } from 'react';
import { ILog } from '../types/log';

interface IEditMealContext {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  logToEdit: ILog;
  // setLogToEdit: React.Dispatch<React.SetStateAction<ILog>>;
  updateMeal: (userId: string, logId: string, mealId: string) => Promise<void>;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: {
  children: React.ReactNode;
  log: ILog;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [logToEdit] = useState(props.log); // Not using setLogToEdit, props.log will always exist?

  async function updateMeal(userId: string, logId: string, mealId: string) {
    console.log({ userId, logId, mealId });
  }

  const value = { isEditing, setIsEditing, logToEdit, updateMeal };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
