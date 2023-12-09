import { useContext } from 'react';
import { FoodContext, IFoodContext } from '../../contexts/food-context';
import { StyledFoodInfo } from './food-info.styled';

export default function FoodInfo() {
  const { selectedFood } = useContext(FoodContext) as IFoodContext;
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