import {
  Brand,
  BrandAndName,
  FoodInfoContainer,
  FoodInfoRow,
  MacroContainer,
  MacroFoodInfoRow,
  NoSelectedFoodContainer,
  StyledFoodInfo,
} from './food-info.styled';
import { StyledH3FoodInfo } from '../styled-header/styled-header.styled';
import { useFoods } from '../../hooks/useFoods';
import { useState } from 'react';
import { PrimaryButton } from '../button/button.styled';

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
          <MacroFoodInfoRow>
            <MacroContainer>
              <div>{selectedFood.calories}</div>
              <div>cals</div>
            </MacroContainer>
            <MacroContainer>
              <div>{selectedFood.macros.fat}g</div>
              <div>fat</div>
            </MacroContainer>
            <MacroContainer>
              <div>{selectedFood.macros.carbs}g</div>
              <div>carbs</div>
            </MacroContainer>
            <MacroContainer>
              <div>{selectedFood.macros.protein}g</div>
              <div>protein</div>
            </MacroContainer>
          </MacroFoodInfoRow>
          <PrimaryButton>Add to Meal</PrimaryButton>
        </FoodInfoContainer>
      ) : (
        <NoSelectedFoodContainer>
          <h3>Click a food to load its data.</h3>
        </NoSelectedFoodContainer>
      )}
    </StyledFoodInfo>
  );
}
