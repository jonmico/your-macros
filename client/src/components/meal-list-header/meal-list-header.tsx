import { StyledMealListHeader, Row } from './meal-list-header.styled';

export default function MealListHeader() {
  return (
    <StyledMealListHeader>
      <Row>
        <p>Food</p>
        <p>Servings</p>
        <p>Amount</p>
        <p>Calories and Macros</p>
      </Row>
    </StyledMealListHeader>
  );
}
