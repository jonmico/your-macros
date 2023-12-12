import { useState } from 'react';
import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import MealBuilder from '../../components/meal-builder/meal-builder';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import { FoodProvider } from '../../contexts/food-context';
import { IFood } from '../../types/food';
import { IMealComponent } from '../../types/meal-component';
import { AddMealUI, SearchInfoRow } from './add-meal.styled';

// TODO: Stop duplicate foods from being added. Key prop is very upset about this.
export default function AddMeal() {
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);

  const [mealComponents, setMealComponents] = useState<IMealComponent[]>([]);

  function addToMeal(mealComponent: IMealComponent) {
    setMealComponents((prevState) => [...prevState, mealComponent]);
  }

  return (
    <div>
      <StyledH2BottomBorder>Add Meal</StyledH2BottomBorder>
      <AddMealUI>
        <MealBuilder mealComponents={mealComponents} />

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
