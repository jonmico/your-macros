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
  Calories,
  Fat,
  Carbs,
  Protein,
  MealDataNumber,
} from './add-meal.styled';
import { IFood } from '../../types/food';
import { FoodProvider } from '../../contexts/food-context';
import MealList from '../../components/meal-list/meal-list';
import MealListHeader from '../../components/meal-list-header/meal-list-header';

// TODO: Stop duplicate foods from being added. Key prop is very upset about this.
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
