import { createContext, useState } from 'react';
import { ILog } from '../types/log';
import { IMeal } from '../types/meal';

interface IEditMealContext {
  isEditing: boolean;
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>;
  logToEdit: ILog;
  updateMeal: (userId: string, logId: string, mealId: string) => Promise<void>;
  currentEditMeal: IMeal | null;
  setCurrentEditMeal: React.Dispatch<React.SetStateAction<IMeal | null>>;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: {
  children: React.ReactNode;
  log: ILog;
}) {
  const [currentEditMeal, setCurrentEditMeal] = useState<IMeal | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [logToEdit] = useState(props.log); // Not using setLogToEdit, props.log will always exist?

  async function updateMeal(userId: string, logId: string, mealId: string) {
    console.log({ userId, logId, mealId });
  }

  function editServings(mealComponentId: string, servings: number) {
    if (!currentEditMeal) return null;
    const mealCompToEdit = currentEditMeal.mealComponents.find(
      (mealComp) => mealComp._id === mealComponentId
    );

    if (!mealCompToEdit) return null;

    mealCompToEdit.servings = servings;
    const index = currentEditMeal?.mealComponents.find(
      (mealComp) => mealComp._id === mealCompToEdit._id
    );

    if (!index) return null;

    setCurrentEditMeal(
      (currentEditMeal.mealComponents[index] = mealCompToEdit)
    );
  }

  const value = {
    isEditing,
    setIsEditing,
    logToEdit,
    updateMeal,
    currentEditMeal,
    setCurrentEditMeal,
    editServings,
  };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
