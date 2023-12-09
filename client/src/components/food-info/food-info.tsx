import { useFoods } from '../../contexts/food-context';
import { StyledFoodInfo } from './food-info.styled';

export default function FoodInfo() {
  const { selectedFood } = useFoods();
  return (
    <StyledFoodInfo>
      {selectedFood ? (
        selectedFood?.name
      ) : (
        <h3>Click a food to load its data.</h3>
      )}
    </StyledFoodInfo>
  );
}
