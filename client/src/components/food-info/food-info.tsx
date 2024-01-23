import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { useMeals } from '../../hooks/useMeals';
import Button from '../button/button';
import Input from '../input/input';
import {
  CalorieContainer,
  CarbsContainer,
  FatContainer,
  ProteinContainer,
} from '../macro-container/macro-container.styled';
import { StyledH3FoodInfo } from '../styled-header/styled-header.styled';
import {
  Brand,
  BrandAndName,
  FoodInfoForm,
  FoodInfoHeader,
  FoodInfoRow,
  MacroFoodInfoRow,
  StyledFoodInfo,
} from './food-info.styled';

export default function FoodInfo() {
  const {
    addToMeal,
    mealComponents,
    setMealComponentsError,
    mealComponentsError,
  } = useMeals();
  const { selectedFood, clearSelectedFood } = useFoods();
  const [servings, setServings] = useState('1');
  const servingsNum = Number(servings);

  const isInMealComponents = mealComponents
    .map(({ food }) => food._id)
    .includes(selectedFood?._id);

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (selectedFood && servingsNum > 0) {
      const mealComponent = { food: selectedFood, servings: servingsNum };
      addToMeal(mealComponent);
      if (mealComponentsError) setMealComponentsError('');
      setServings('1');
    }
  }

  function handleClearSelectedFood() {
    clearSelectedFood();
    setServings('1');
  }

  if (selectedFood === null) return null;

  return (
    <StyledFoodInfo>
      <FoodInfoForm onSubmit={handleSubmit}>
        <FoodInfoHeader>
          <BrandAndName>
            <StyledH3FoodInfo>{selectedFood.name}</StyledH3FoodInfo>
            <Brand>{selectedFood.brand}</Brand>
          </BrandAndName>
          <FaXmark onClick={handleClearSelectedFood} />
        </FoodInfoHeader>
        <FoodInfoRow>
          <div>Serving Size</div>
          <div>{selectedFood.servingSize}g</div>
        </FoodInfoRow>
        <FoodInfoRow>
          <label htmlFor={'servings'}>Servings</label>
          <Input
            name={'servings'}
            id={'servings'}
            step={0.01}
            stateVal={servings}
            setStateFn={setServings}
            type='number'
          />
        </FoodInfoRow>
        <MacroFoodInfoRow>
          <CalorieContainer>
            <div>{servingsNum * selectedFood.calories}</div>
            <div>cals</div>
          </CalorieContainer>
          <FatContainer>
            <div>{servingsNum * selectedFood.macros.fat}g</div>
            <div>fat</div>
          </FatContainer>
          <CarbsContainer>
            <div>{servingsNum * selectedFood.macros.carbs}g</div>
            <div>carbs</div>
          </CarbsContainer>
          <ProteinContainer>
            <div>{servingsNum * selectedFood.macros.protein}g</div>
            <div>protein</div>
          </ProteinContainer>
        </MacroFoodInfoRow>
        <Button btnStyle={'primary'} disabled={isInMealComponents}>
          {isInMealComponents ? 'Already in meal' : 'Add to Meal'}
        </Button>
      </FoodInfoForm>
    </StyledFoodInfo>
  );
}
