import { useState } from 'react';
import { useMeals } from '../../hooks/useMeals';
import IMeal from '../../types/meal';
import { AddMealToLogButton } from '../button/button.styled';
import MealData from '../meal-data/meal-data';
import MealItem from '../meal-item/meal-item';
import MealListHeader from '../meal-list-header/meal-list-header';
import MealList from '../meal-list/meal-list';
import {
  DataButtonContainer,
  MealNameContainer,
  MealNameError,
  MealNameInput,
  StartText,
  StyledMealBuilder,
} from './meal-builder.styled';
import { createMeal } from '../../services/meal-api';

export default function MealBuilder() {
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

    const backendMealComponents = mealComponents.map((food) => {
      return { food: food.food._id, servings: food.servings };
    });

    const meal: IMeal = {
      name: mealName,
      mealComponents: backendMealComponents,
      calories: mealCalories,
      macros: {
        fat: mealFat,
        carbs: mealCarbs,
        protein: mealProtein,
      },
    };

    const data = await createMeal(meal);
    console.log(data);
  }

  return (
    <StyledMealBuilder>
      {!mealComponents.length ? (
        <StartText>Start building your meal below!</StartText>
      ) : (
        <>
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
            <AddMealToLogButton onClick={handleAddToMealClick}>
              Add Meal to Log
            </AddMealToLogButton>
          </DataButtonContainer>
          <MealList>
            <MealListHeader />
            {mealComponents.map((mealComponent) => (
              <MealItem
                key={mealComponent.food._id}
                mealComponent={mealComponent}
              />
            ))}
          </MealList>
        </>
      )}
    </StyledMealBuilder>
  );
}
