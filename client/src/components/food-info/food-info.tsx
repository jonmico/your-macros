import {
  Brand,
  BrandAndName,
  FoodInfoForm,
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
import { IFood } from '../../types/food';

interface FoodInfoProps {
  addToMeal: (food: IFood) => void;
}

export default function FoodInfo(props: FoodInfoProps) {
  const { selectedFood } = useFoods();
  const [servings, setServings] = useState('1');

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (selectedFood) {
      props.addToMeal(selectedFood);
    }
  }

  return (
    <StyledFoodInfo>
      {selectedFood ? (
        <FoodInfoForm onSubmit={handleSubmit}>
          <BrandAndName>
            <StyledH3FoodInfo>{selectedFood.name}</StyledH3FoodInfo>
            <Brand>{selectedFood.brand}</Brand>
          </BrandAndName>
          <FoodInfoRow>
            <div>Serving Size</div>
            <div>{selectedFood.servingSize}g</div>
          </FoodInfoRow>
          <FoodInfoRow>
            <label>Servings</label>
            <input
              value={servings}
              onChange={(evt) => setServings(evt.target.value)}
              type='number'
            />
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
        </FoodInfoForm>
      ) : (
        <NoSelectedFoodContainer>
          <h3>Click a food to load its data.</h3>
        </NoSelectedFoodContainer>
      )}
    </StyledFoodInfo>
  );
}
