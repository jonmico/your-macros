import { useState } from 'react';
import { useMeals } from '../../hooks/useMeals';
import { addMealToLog } from '../../services/user-api';
import { IMeal } from '../../types/meal';
import { AddMealToLogButton } from '../button/button.styled';
import MealData from '../meal-data/meal-data';
import MealItem from '../meal-item/meal-item';
import MealListHeader from '../meal-list-header/meal-list-header';
import MealList from '../meal-list/meal-list';
import {
  DataButtonContainer,
  MealListContainer,
  MealNameContainer,
  MealNameError,
  MealNameInput,
  StartText,
  StyledMealBuilder,
} from './meal-builder.styled';
import useUser from '../../hooks/useUser';

export default function MealBuilder() {
  const { user } = useUser();
  const { mealComponents, mealName, setMealName } = useMeals();
  const [mealNameError, setMealNameError] = useState('');

  const mealCalories = mealComponents.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );
  const mealFat = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );
  const mealCarbs = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );
  const mealProtein = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );

  const mealData = {
    calories: mealCalories,
    fat: mealFat,
    carbs: mealCarbs,
    protein: mealProtein,
  };

  async function handleAddToMealClick() {
    if (!mealName) {
      setMealNameError('Please name the meal');
      return;
    }

    const meal: IMeal = {
      name: mealName,
      mealComponents,
      calories: mealCalories,
      macros: {
        fat: mealFat,
        carbs: mealCarbs,
        protein: mealProtein,
      },
    };

    if (!user) {
      return;
    }

    const data = await addMealToLog(meal, user.logs[0]._id, user._id);
    console.log(data);
  }

  return (
    <StyledMealBuilder>
      <MealNameContainer>
        <MealNameInput
          placeholder={'Meal Name'}
          type='text'
          value={mealName}
          onChange={(evt) => {
            setMealNameError('');
            setMealName(evt.target.value);
          }}
        />
        {mealNameError && <MealNameError>{mealNameError}</MealNameError>}
      </MealNameContainer>
      <DataButtonContainer>
        <MealData mealData={mealData} />
        <AddMealToLogButton
          disabled={!mealComponents.length}
          onClick={handleAddToMealClick}
        >
          Add Meal to Log
        </AddMealToLogButton>
      </DataButtonContainer>
      <MealListContainer>
        <MealListHeader />
        {!mealComponents.length ? (
          <StartText>Items you add to your meal will show here.</StartText>
        ) : (
          <>
            <MealList>
              {mealComponents.map((mealComponent) => (
                <MealItem
                  key={mealComponent.food._id}
                  mealComponent={mealComponent}
                />
              ))}
            </MealList>
          </>
        )}
      </MealListContainer>
    </StyledMealBuilder>
  );
}
