import { useState } from 'react';
import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import MealBuilder from '../../components/meal-builder/meal-builder';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import { FoodProvider } from '../../contexts/food-context';
import { IMealComponent } from '../../types/meal-component';
import { AddMealUI, SearchInfoRow } from './add-meal.styled';

export default function AddMeal() {
  const [mealComponents, setMealComponents] = useState<IMealComponent[]>([]);

  function addToMeal(mealComponent: IMealComponent) {
    setMealComponents((prevState) => [...prevState, mealComponent]);
  }

  function removeFromMeal(id: string) {
    setMealComponents((prevState) =>
      prevState.filter(({ food }) => id !== food._id)
    );
  }

  return (
    <div>
      <StyledH2BottomBorder>Add Meal</StyledH2BottomBorder>
      <AddMealUI>
        <MealBuilder
          removeFromMeal={removeFromMeal}
          mealComponents={mealComponents}
        />
        <FoodProvider>
          <SearchInfoRow>
            <FoodSearch />
            <FoodInfo mealComponents={mealComponents} addToMeal={addToMeal} />
          </SearchInfoRow>
        </FoodProvider>
      </AddMealUI>
    </div>
  );
}
