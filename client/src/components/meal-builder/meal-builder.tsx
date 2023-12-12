import { useState } from 'react';
import { IMealComponent } from '../../types/meal-component';
import MealItem from '../meal-item/meal-item';
import MealListHeader from '../meal-list-header/meal-list-header';
import MealList from '../meal-list/meal-list';
import {
  Calories,
  Carbs,
  Fat,
  MealData,
  MealDataNumber,
  MealNameInput,
  Protein,
  StyledMealBuilder,
} from './meal-builder.styled';

interface MealBuilderProps {
  mealComponents: IMealComponent[];
}

export default function MealBuilder(props: MealBuilderProps) {
  const [mealName, setMealName] = useState('');
  const { mealComponents } = props;

  const mealCalories = mealComponents.reduce(
    (prev, curr) => prev + curr.food.calories,
    0
  );
  const mealFat = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.fat,
    0
  );
  const mealCarbs = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.carbs,
    0
  );
  const mealProtein = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.protein,
    0
  );

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
          <MealData>
            <Calories>
              <MealDataNumber>{mealCalories}</MealDataNumber>
              <p>cals</p>
            </Calories>
            <Fat>
              <MealDataNumber>{mealFat}g</MealDataNumber>
              <p>fat</p>
            </Fat>
            <Carbs>
              <MealDataNumber>{mealCarbs}g</MealDataNumber>
              <p>carbs</p>
            </Carbs>
            <Protein>
              <MealDataNumber>{mealProtein}g</MealDataNumber>
              <p>protein</p>
            </Protein>
          </MealData>
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
