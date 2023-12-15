import { StyledMealListHeader, Row } from './meal-list-header.styled';

export default function MealListHeader() {
  return (
    <StyledMealListHeader>
      <Row>
        <h4>Food</h4>
        <h4>Servings</h4>
        <h4>Amount</h4>
        <h4>Calories and Macros</h4>
      </Row>
    </StyledMealListHeader>
  );
}
