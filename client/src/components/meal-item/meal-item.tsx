import { FaCircleXmark } from 'react-icons/fa6';
import { IMealComponent } from '../../types/meal-component';
import {
  CaloriesAndMacrosContainer,
  MacrosContainer,
  StyledMealItem,
  SvgContainer,
} from './meal-item.styled';
import { Calories, Fat, Carbs, Protein } from '../macros/macros.styled';
import { useState } from 'react';
import { useMeals } from '../../hooks/useMeals';

interface MealItemProps {
  mealComponent: IMealComponent;
}

export default function MealItem(props: MealItemProps) {
  const { _id, name, brand, servingSize, calories, macros } =
    props.mealComponent.food;
  const { removeFromMeal, editServings } = useMeals();
  const [servings, setServings] = useState(
    String(props.mealComponent.servings)
  );

  function handleRemoveFromMeal() {
    if (_id) {
      removeFromMeal(_id);
    }
  }

  function handleEditServings() {
    editServings(props.mealComponent, Number(servings));
  }

  return (
    <StyledMealItem>
      <p>
        {brand} {name}
      </p>
      {/* <p>{props.mealComponent.servings}</p> */}
      <div>
        <input
          type='number'
          value={servings}
          onChange={(evt) => setServings(evt.target.value)}
        />
        <button onClick={handleEditServings}>Edit</button>
      </div>
      <p>{servingSize}g</p>
      <CaloriesAndMacrosContainer>
        <Calories>{calories * Number(servings)}cals</Calories>
        <MacrosContainer>
          <Fat>{macros.fat * Number(servings)}f</Fat>
          <Carbs>{macros.carbs * Number(servings)}c</Carbs>
          <Protein>{macros.protein * Number(servings)}p</Protein>
        </MacrosContainer>
      </CaloriesAndMacrosContainer>
      <SvgContainer>
        <FaCircleXmark onClick={handleRemoveFromMeal} />
      </SvgContainer>
    </StyledMealItem>
  );
}
