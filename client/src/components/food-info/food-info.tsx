import { useContext } from 'react';
import { FoodContext, IFoodContext } from '../../contexts/food-context';
import {
  CalorieAndServingSize,
  FoodInfoContainer,
  NoSelectedFoodContainer,
  StyledFoodInfo,
} from './food-info.styled';
import { StyledH3FoodInfo } from '../styled-header/styled-header.styled';

export default function FoodInfo() {
  const { selectedFood } = useContext(FoodContext) as IFoodContext;

  return (
    <StyledFoodInfo>
      {selectedFood ? (
        <FoodInfoContainer>
          <div>
            <StyledH3FoodInfo>{selectedFood?.name}</StyledH3FoodInfo>
          </div>
          <CalorieAndServingSize>
            <p>{selectedFood?.calories}cals</p>
            <p>{selectedFood?.servingSize}g</p>
          </CalorieAndServingSize>
        </FoodInfoContainer>
      ) : (
        <NoSelectedFoodContainer>
          <h3>Click a food to load its data.</h3>
        </NoSelectedFoodContainer>
      )}
    </StyledFoodInfo>
  );
}
