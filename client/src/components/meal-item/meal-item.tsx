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
  removeFromMeal: (id: string) => void;
}

export default function MealItem(props: MealItemProps) {
  const { _id, name, brand, servingSize, calories, macros } =
    props.mealComponent.food;

  function handleClick() {
    if (_id) {
      props.removeFromMeal(_id);
    }
  }

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
        <FaCircleXmark onClick={handleClick} />
      </SvgContainer>
    </StyledMealItem>
  );
}
