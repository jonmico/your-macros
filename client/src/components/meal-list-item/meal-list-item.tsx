import { useState } from 'react';
import { FaCircleXmark } from 'react-icons/fa6';
import { useMeals } from '../../hooks/useMeals';
import { IMealComponent } from '../../types/meal-component';
import { EditButton } from '../button/button.styled';
import { Calories, Carbs, Fat, Protein } from '../macros/macros.styled';
import {
  CaloriesAndMacrosContainer,
  EditServingsForm,
  MacrosContainer,
  StyledMealItem,
  SvgContainer,
} from './meal-list-item.styled';

import styles from './meal-list-item.module.css';

interface MealItemProps {
  mealComponent: IMealComponent;
}

export default function MealListItem(props: MealItemProps) {
  const { _id, name, brand, servingSize, calories, macros } =
    props.mealComponent.food;
  const { removeFromMeal, editServings } = useMeals();
  const [servings, setServings] = useState(
    String(props.mealComponent.servings)
  );
  const [isEditActive, setIsEditActive] = useState(false);

  function handleRemoveFromMeal() {
    if (_id) {
      removeFromMeal(_id);
    }
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    editServings(props.mealComponent, Number(servings));
    setIsEditActive(false);
  }

  return (
    <StyledMealItem>
      <p>
        {brand} {name}
      </p>
      <EditServingsForm onSubmit={handleSubmit}>
        <input
          className={styles.editServingsInput}
          onClick={() => setIsEditActive(true)}
          step={0.01}
          type='number'
          value={servings}
          onChange={(evt) => setServings(evt.target.value)}
        />
        {isEditActive && <EditButton>Edit</EditButton>}
      </EditServingsForm>
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
