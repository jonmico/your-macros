import { FaXmark } from 'react-icons/fa6';
import styles from './edit-meal-form.module.css';
import { IMeal } from '../../types/meal';
import { useState } from 'react';
import { IMealComponent } from '../../types/meal-component';
import { calcCaloriesMacros } from '../../utils/calcCaloriesMacros';

export default function EditMealForm(props: {
  handleCloseModal: () => void;
  mealToEdit: IMeal;
}) {
  const [mealToEditCopy, setMealToEditCopy] = useState({ ...props.mealToEdit });

  function removeFromMeal(mealComponentId: string) {
    const filteredMealComponents = mealToEditCopy.mealComponents.filter(
      (mealComp) => mealComp._id !== mealComponentId
    );

    const { totalCals, totalCarbs, totalFat, totalProtein } =
      calcCaloriesMacros(filteredMealComponents);

    const updatedMeal: IMeal = {
      ...mealToEditCopy,
      mealComponents: filteredMealComponents,
      calories: totalCals,
      macros: { carbs: totalCarbs, fat: totalFat, protein: totalProtein },
    };

    setMealToEditCopy(updatedMeal);
  }

  return (
    <form className={styles.editMealForm}>
      <div className={styles.editMealFormHeader}>
        <h2>Edit Meal</h2>
        <button onClick={props.handleCloseModal}>
          <FaXmark />
        </button>
      </div>
      <div>
        <ul className={styles.mealComponentList}>
          {mealToEditCopy.mealComponents.map((mealComp) => (
            <EditMealFormMealComponentListItem
              key={mealComp._id}
              mealComp={mealComp}
              removeFromMeal={removeFromMeal}
            />
          ))}
        </ul>
      </div>
    </form>
  );
}

function EditMealFormMealComponentListItem(props: {
  mealComp: IMealComponent;
  removeFromMeal: (mealComponentId: string) => void;
}) {
  const { mealComp } = props;
  const [servings, setServings] = useState(String(mealComp.servings));

  return (
    <li className={styles.mealComponentListItem}>
      <div>
        <div>{mealComp.food.name}</div>
        <div>{mealComp.food.brand}</div>
      </div>
      <div>
        <label htmlFor='servings'>Servings</label>
        <input
          value={servings}
          onChange={(evt) => setServings(evt.target.value)}
          type='number'
          id={'servings'}
          name={'servings'}
        />
      </div>
      <div>macro info</div>
      <div>
        <button
          type={'button'}
          onClick={() => props.removeFromMeal(mealComp._id)}
        >
          <FaXmark />
        </button>
      </div>
    </li>
  );
}
