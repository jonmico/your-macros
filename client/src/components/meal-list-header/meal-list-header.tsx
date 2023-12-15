import { StyledMealListHeader, Row } from './meal-list-header.styled';
import { ClearButton } from '../button/button.styled';
import { useMeals } from '../../hooks/useMeals';

export default function MealListHeader() {
  const { clearMeal } = useMeals();
  return (
    <StyledMealListHeader>
      <Row>
        <h4>Food</h4>
        <h4>Servings</h4>
        <h4>Amount</h4>
        <h4>Calories and Macros</h4>
        <ClearButton onClick={clearMeal}>Clear</ClearButton>
      </Row>
    </StyledMealListHeader>
  );
}
