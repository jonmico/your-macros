import {
  Brand,
  BrandAndName,
  FoodInfoContainer,
  FoodInfoRow,
  NoSelectedFoodContainer,
  StyledFoodInfo,
} from './food-info.styled';
import { StyledH3FoodInfo } from '../styled-header/styled-header.styled';
import { useFoods } from '../../hooks/useFoods';
import { useState } from 'react';

export default function FoodInfo() {
  const { selectedFood } = useFoods();
  const [servings, setServings] = useState('1');

  return (
    <StyledFoodInfo>
      {selectedFood ? (
        <FoodInfoContainer>
          <BrandAndName>
            <StyledH3FoodInfo>{selectedFood.name}</StyledH3FoodInfo>
            <Brand>{selectedFood.brand}</Brand>
          </BrandAndName>
          <FoodInfoRow>
            <div>Serving Size</div>
            <div>{selectedFood.servingSize}g</div>
          </FoodInfoRow>
          <FoodInfoRow>
            <div>Servings</div>
            <div>
              <input
                value={servings}
                onChange={(evt) => setServings(evt.target.value)}
                type='number'
              />
            </div>
          </FoodInfoRow>
          <FoodInfoRow>
            <div>{selectedFood.calories}</div>
            <div>{selectedFood.macros.fat}</div>
            <div>{selectedFood.macros.carbs}</div>
            <div>{selectedFood.macros.protein}</div>
          </FoodInfoRow>
        </FoodInfoContainer>
      ) : (
        <NoSelectedFoodContainer>
          <h3>Click a food to load its data.</h3>
        </NoSelectedFoodContainer>
      )}
    </StyledFoodInfo>
  );
}
