import { useState } from 'react';
import { useMeals } from '../../hooks/useMeals';
import { IMeal } from '../../types/meal';
import AddMealToLogModal from '../add-meal-to-log-modal/add-meal-to-log-modal';
import MealData from '../meal-data/meal-data';
import MealListItem from '../meal-list-item/meal-list-item';
import {
  DataButtonContainer,
  MealListContainer,
  MealNameContainer,
  MealNameError,
  MealNameInput,
  StartText,
  StyledMealBuilder,
} from './meal-builder.styled';

import Button from '../button/button';
import styles from './meal-builder.module.css';

export default function MealBuilder() {
  const {
    mealComponents,
    mealName,
    setMealName,
    setMealComponentsError,
    setMealNameError,
    mealNameError,
    mealComponentsError,
  } = useMeals();

  const [showModal, setShowModal] = useState(false);

  const mealCalories = mealComponents.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );
  const mealFat = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );
  const mealCarbs = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );
  const mealProtein = mealComponents.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );

  const mealData = {
    calories: mealCalories,
    fat: mealFat,
    carbs: mealCarbs,
    protein: mealProtein,
  };

  function handleShowModal() {
    if (!mealName) {
      setMealNameError('Please name the meal');
    }

    if (mealComponents.length === 0) {
      setMealComponentsError('Meal is empty');
    }

    if (!mealName || mealComponents.length === 0) {
      return;
    }

    setShowModal(true);
  }

  const meal: IMeal = {
    name: mealName,
    mealComponents,
    calories: mealCalories,
    macros: {
      fat: mealFat,
      carbs: mealCarbs,
      protein: mealProtein,
    },
  };

  return (
    <StyledMealBuilder>
      {showModal && (
        <AddMealToLogModal meal={meal} setShowModal={setShowModal} />
      )}
      <MealNameContainer>
        <MealNameInput
          placeholder={'Meal Name'}
          type='text'
          value={mealName}
          onChange={(evt) => {
            setMealNameError('');
            setMealName(evt.target.value);
          }}
        />
        {mealNameError && <MealNameError>{mealNameError}</MealNameError>}
      </MealNameContainer>
      <DataButtonContainer>
        <MealData mealData={mealData} />
        <div className={styles.addMealContainer}>
          <Button type={'primary'} onClick={handleShowModal}>
            Add Meal to Log
          </Button>
          {mealComponentsError && (
            <div className={styles.errorText}>{mealComponentsError}</div>
          )}
        </div>
      </DataButtonContainer>
      <MealListContainer>
        <MealListHeader />
        {!mealComponents.length ? (
          <StartText>Items you add to your meal will show here.</StartText>
        ) : (
          <>
            <MealList>
              {mealComponents.map((mealComponent) => (
                <MealListItem
                  key={mealComponent.food._id}
                  mealComponent={mealComponent}
                />
              ))}
            </MealList>
          </>
        )}
      </MealListContainer>
    </StyledMealBuilder>
  );
}

function MealListHeader() {
  const { clearMeal } = useMeals();
  return (
    <div className={styles.mealListHeader}>
      <div className={styles.mealListRow}>
        <h4>Food</h4>
        <h4>Servings</h4>
        <h4>Amount</h4>
        <h4>Calories and Macros</h4>
        <Button onClick={clearMeal} type={'small'}>
          CLEAR
        </Button>
      </div>
    </div>
  );
}

function MealList(props: { children: React.ReactNode }) {
  return <div className={styles.mealList}>{props.children}</div>;
}
