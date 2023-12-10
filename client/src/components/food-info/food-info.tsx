import { useContext } from 'react';
import { FoodContext } from '../../contexts/food-context';
import {
  Brand,
  BrandAndName,
  CalorieAndServingSize,
  FoodInfoContainer,
  NoSelectedFoodContainer,
  StyledFoodInfo,
} from './food-info.styled';
import { StyledH3FoodInfo } from '../styled-header/styled-header.styled';

export default function FoodInfo() {
  const { selectedFood } = useContext(FoodContext);

  return (
    <StyledFoodInfo>
      {selectedFood ? (
        <FoodInfoContainer>
          <BrandAndName>
            <StyledH3FoodInfo>{selectedFood?.name}</StyledH3FoodInfo>
            <Brand>{selectedFood?.brand}</Brand>
          </BrandAndName>
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
