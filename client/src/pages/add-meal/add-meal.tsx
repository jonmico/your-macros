import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import { AddMealUI } from './add-meal.styled';

export default function AddMeal() {
  return (
    <div>
      <StyledH2BottomBorder>Add Meal</StyledH2BottomBorder>
      <AddMealUI>
        <FoodSearch />
        <FoodInfo />
      </AddMealUI>
    </div>
  );
}
