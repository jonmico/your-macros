import { useState } from 'react';
import MealItem from '../meal-item/meal-item';
import MealListHeader from '../meal-list-header/meal-list-header';
import MealList from '../meal-list/meal-list';
import { MealNameInput, StyledMealBuilder } from './meal-builder.styled';
import MealData from '../meal-data/meal-data';
import { useMeals } from '../../hooks/useMeals';

export default function MealBuilder() {
  const [mealName, setMealName] = useState('');
  const { mealComponents } = useMeals();

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

  return (
    <StyledMealBuilder>
      {!mealComponents.length ? (
        <p>Start building your meal below!</p>
      ) : (
        <>
          <MealNameInput
            placeholder={'Meal Name'}
            type='text'
            value={mealName}
            onChange={(evt) => setMealName(evt.target.value)}
          />
          <MealData mealData={mealData} />
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
