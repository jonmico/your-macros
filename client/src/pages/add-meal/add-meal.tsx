import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import MealBuilder from '../../components/meal-builder/meal-builder';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import { FoodProvider } from '../../contexts/food-context';
import { MealProvider } from '../../contexts/meal-context';
import { AddMealUI, SearchInfoRow } from './add-meal.styled';

export default function AddMeal() {
  return (
    <div>
      <StyledH2BottomBorder>Add Meal</StyledH2BottomBorder>
      <AddMealUI>
        <MealProvider>
          <MealBuilder />
          <FoodProvider>
            <SearchInfoRow>
              <FoodSearch />
              <FoodInfo />
            </SearchInfoRow>
          </FoodProvider>
        </MealProvider>
      </AddMealUI>
    </div>
  );
}
