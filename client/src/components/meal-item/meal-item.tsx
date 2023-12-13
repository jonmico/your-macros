import { FaCircleXmark } from 'react-icons/fa6';
import { IMealComponent } from '../../types/meal-component';
import {
  CaloriesAndMacrosContainer,
  MacrosContainer,
  StyledMealItem,
  SvgContainer,
} from './meal-item.styled';
import { Calories, Fat, Carbs, Protein } from '../macros/macros.styled';

interface MealItemProps {
  mealComponent: IMealComponent;
}

export default function MealItem(props: MealItemProps) {
  const { name, brand, servingSize, calories, macros } =
    props.mealComponent.food;
  return (
    <StyledMealItem>
      <p>
        {brand} {name}
      </p>
      <p>{props.mealComponent.servings}</p>
      <p>{servingSize}g</p>
      <CaloriesAndMacrosContainer>
        <Calories>{calories * props.mealComponent.servings}cals</Calories>
        <MacrosContainer>
          <Fat>{macros.fat * props.mealComponent.servings}f</Fat>
          <Carbs>{macros.carbs * props.mealComponent.servings}c</Carbs>
          <Protein>{macros.protein * props.mealComponent.servings}p</Protein>
        </MacrosContainer>
      </CaloriesAndMacrosContainer>
      <SvgContainer>
        <FaCircleXmark />
      </SvgContainer>
    </StyledMealItem>
  );
}
