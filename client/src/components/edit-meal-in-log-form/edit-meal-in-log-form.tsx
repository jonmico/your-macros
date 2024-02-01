import { useState } from 'react';
import { IMealComponent } from '../../types/meal-component';

import { FaXmark } from 'react-icons/fa6';
import styles from './edit-meal-in-log-form.module.css';
import { IMeal } from '../../types/meal';

export default function EditMealInLogForm(props: { currentEditMeal: IMeal }) {
  return (
    <form>
      <EditMealInLogFormHeader />
      <ul className={styles.editMealInLogFormList}>
        {props.currentEditMeal.mealComponents.map((mealComp) => (
          <EditMealInLogFormListItem
            key={mealComp.food._id}
            mealComponent={mealComp}
          />
        ))}
      </ul>
    </form>
  );
}

function EditMealInLogFormHeader() {
  return (
    <div className={styles.editMealInLogFormHeader}>
      <div>Food Name/Brand</div>
      <div>Servings</div>
      <div>Calories/Macros</div>
    </div>
  );
}

function EditMealInLogFormListItem(props: { mealComponent: IMealComponent }) {
  const [servings, setServings] = useState(props.mealComponent.servings);
  return (
    <li className={styles.editMealInLogFormListItem}>
      <div>{props.mealComponent.food.name}</div>
      <div>
        <input
          type='number'
          value={servings}
          onChange={(evt) => setServings(Number(evt.target.value))}
        />
      </div>
      <div>
        {props.mealComponent.food.calories * servings}
        {props.mealComponent.food.macros.fat * servings}
        {props.mealComponent.food.macros.carbs * servings}
        {props.mealComponent.food.macros.protein * servings}
      </div>
      <button>
        <FaXmark />
      </button>
    </li>
  );
}
