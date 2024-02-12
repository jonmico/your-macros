import { SetStateAction, createContext, useState } from 'react';
import { IMeal } from '../types/meal';
import { IFood } from '../types/food';
import { calcCaloriesMacros } from '../utils/calcCaloriesMacros';

interface IEditMealContext {
  mealToEdit: IMeal | null;
  setMealToEdit: React.Dispatch<SetStateAction<IMeal | null>>;
  mealToEditCopy: IMeal | null;
  setMealToEditCopy: React.Dispatch<SetStateAction<IMeal | null>>;
  logId: string;
  searchInput: string;
  setSearchInput: React.Dispatch<SetStateAction<string>>;
  searchedFoodsError: string;
  setSearchedFoodsError: React.Dispatch<SetStateAction<string>>;
  searchedFoods: IFood[];
  setSearchedFoods: React.Dispatch<SetStateAction<IFood[]>>;
  removeFromMeal: (mealComponentId: string | undefined) => void;
  editMealCompServings: (
    mealComponentId: string | undefined,
    servings: number
  ) => void;
  resetMeal: () => void;
  handleCancelClick: () => void;
  selectedFood: IFood | null;
  setSelectedFood: React.Dispatch<SetStateAction<IFood | null>>;
}

export const EditMealContext = createContext<IEditMealContext | null>(null);

export function EditMealProvider(props: {
  children: React.ReactNode;
  logId: string;
}) {
  const [mealToEdit, setMealToEdit] = useState<IMeal | null>(null);
  const [mealToEditCopy, setMealToEditCopy] = useState<IMeal | null>(null);
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoodsError, setSearchedFoodsError] = useState('');

  function removeFromMeal(mealComponentId: string | undefined) {
    if (mealToEditCopy === null) return;

    const filteredMealComponents = mealToEditCopy.mealComponents.filter(
      (mealComp) => mealComp._id !== mealComponentId
    );

    const { totalCals, totalCarbs, totalFat, totalProtein } =
      calcCaloriesMacros(filteredMealComponents);

    const updatedMeal: IMeal = {
      ...mealToEditCopy,
      mealComponents: filteredMealComponents,
      calories: totalCals,
      macros: { carbs: totalCarbs, fat: totalFat, protein: totalProtein },
    };

    setMealToEditCopy(updatedMeal);
  }

  function editMealCompServings(
    mealComponentId: string | undefined,
    servings: number
  ) {
    if (mealComponentId === undefined || mealToEditCopy === null) return;

    const updatedMealComponents = mealToEditCopy.mealComponents.map(
      (mealComponent) => {
        if (mealComponent._id === mealComponentId) {
          return { ...mealComponent, servings };
        }
        return mealComponent;
      }
    );

    const { totalCals, totalFat, totalCarbs, totalProtein } =
      calcCaloriesMacros(updatedMealComponents);

    const updatedMeal: IMeal = {
      ...mealToEditCopy,
      mealComponents: updatedMealComponents,
      calories: totalCals,
      macros: {
        fat: totalFat,
        carbs: totalCarbs,
        protein: totalProtein,
      },
    };

    setMealToEditCopy(updatedMeal);
  }

  function resetMeal() {
    if (!mealToEdit) return;
    setMealToEditCopy({ ...mealToEdit });
  }

  function handleCancelClick() {
    setMealToEdit(null);
    setMealToEditCopy(null);
    setSearchInput('');
    setSearchedFoods([]);
    setSearchedFoodsError('');
  }

  const value = {
    mealToEdit,
    setMealToEdit,
    mealToEditCopy,
    setMealToEditCopy,
    logId: props.logId,
    searchedFoods,
    setSearchedFoods,
    searchInput,
    setSearchInput,
    removeFromMeal,
    editMealCompServings,
    resetMeal,
    searchedFoodsError,
    setSearchedFoodsError,
    handleCancelClick,
    selectedFood,
    setSelectedFood,
  };

  return (
    <EditMealContext.Provider value={value}>
      {props.children}
    </EditMealContext.Provider>
  );
}
