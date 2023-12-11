import { useState } from 'react';
import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import {
  AddMealUI,
  MealContainer,
  SearchInfoRow,
  MealNameInput,
} from './add-meal.styled';
import { IFood } from '../../types/food';
import { FoodProvider } from '../../contexts/food-context';
import MealList from '../../components/meal-list/meal-list';

export default function AddMeal() {
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [meal, setMeal] = useState<IFood[]>([]);
  const [mealName, setMealName] = useState('');

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
