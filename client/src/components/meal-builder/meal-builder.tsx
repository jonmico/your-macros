import { useState } from 'react';
import { IMealComponent } from '../../types/meal-component';
import MealItem from '../meal-item/meal-item';
import MealListHeader from '../meal-list-header/meal-list-header';
import MealList from '../meal-list/meal-list';
import { MealNameInput, StyledMealBuilder } from './meal-builder.styled';
import MealData from '../meal-data/meal-data';

interface MealBuilderProps {
  mealComponents: IMealComponent[];
  removeFromMeal: (id: string) => void;
}

export default function MealBuilder(props: MealBuilderProps) {
  const [mealName, setMealName] = useState('');
  const { mealComponents } = props;

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
                removeFromMeal={props.removeFromMeal}
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
