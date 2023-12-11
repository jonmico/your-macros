import { useState } from 'react';
import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import {
  AddMealUI,
  MealContainer,
  SearchInfoRow,
  MealNameInput,
  MealData,
  MealMacro,
} from './add-meal.styled';
import { IFood } from '../../types/food';
import { FoodProvider } from '../../contexts/food-context';
import MealList from '../../components/meal-list/meal-list';

export default function AddMeal() {
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [meal, setMeal] = useState<IFood[]>([]);
  const [mealName, setMealName] = useState('');

  const mealCalories = meal.reduce((prev, curr) => prev + curr.calories, 0);
  const mealFat = meal.reduce((prev, curr) => prev + curr.macros.fat, 0);
  const mealCarbs = meal.reduce((prev, curr) => prev + curr.macros.carbs, 0);
  const mealProtein = meal.reduce(
    (prev, curr) => prev + curr.macros.protein,
    0
  );

  console.log(mealCalories);

  function addToMeal(food: IFood) {
    setMeal((prevState) => [...prevState, food]);
  }

  return (
    <div>
      <StyledH2BottomBorder>Add Meal</StyledH2BottomBorder>
      <AddMealUI>
        <MealContainer>
          <MealNameInput
            placeholder={'Meal Name'}
            type='text'
            value={mealName}
            onChange={(evt) => setMealName(evt.target.value)}
          />
          <MealData>
            <MealMacro>
              <p>{mealCalories}</p>
              <p>cals</p>
            </MealMacro>
            <MealMacro>
              <p>{mealFat}g</p>
              <p>fat</p>
            </MealMacro>
            <MealMacro>
              <p>{mealCarbs}g</p>
              <p>carbs</p>
            </MealMacro>
            <MealMacro>
              <p>{mealProtein}g</p>
              <p>protein</p>
            </MealMacro>
          </MealData>
          <MealList>
            {meal.map((food) => (
              <li key={food._id}>{food.name}</li>
            ))}
          </MealList>
        </MealContainer>

        <FoodProvider>
          <SearchInfoRow>
            <FoodSearch
              searchedFoods={searchedFoods}
              setSearchedFoods={setSearchedFoods}
            />
            <FoodInfo addToMeal={addToMeal} />
          </SearchInfoRow>
        </FoodProvider>
      </AddMealUI>
    </div>
  );
}
