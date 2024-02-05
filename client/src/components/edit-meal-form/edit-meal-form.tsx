import { FaXmark } from 'react-icons/fa6';
import styles from './edit-meal-form.module.css';
import { IMeal } from '../../types/meal';
import { useState } from 'react';
import { IMealComponent } from '../../types/meal-component';
import { calcCaloriesMacros } from '../../utils/calcCaloriesMacros';
import { apiEditMealInLog } from '../../services/user-api';

export default function EditMealForm(props: {
  handleCloseModal: () => void;
  mealToEdit: IMeal;
  userId: string;
  logId: string;
}) {
  const [mealToEditCopy, setMealToEditCopy] = useState({
    ...props.mealToEdit,
    mealComponents: [...props.mealToEdit.mealComponents],
  });

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

  function editMealCompServings(mealComponentId: string, servings: number) {
    const updatedMealComponents = mealToEditCopy.mealComponents.map(
      (mealComponent) => {
        if (mealComponent._id === mealComponentId) {
          return { ...mealComponent, servings };
        }
        return mealComponent;
      }
    );

    const { totalCals, totalFat, totalCarbs, totalProtein } =
      calcCaloriesMacros(updatedMealComponents);

    const updatedMeal: IMeal = {
      ...mealToEditCopy,
      mealComponents: updatedMealComponents,
      calories: totalCals,
      macros: {
        fat: totalFat,
        carbs: totalCarbs,
        protein: totalProtein,
      },
    };

    setMealToEditCopy(updatedMeal);
  }

  async function handleSubmitChangesClick() {
    // TODO: Implement this.
    const data = await apiEditMealInLog(
      props.userId,
      props.logId,
      mealToEditCopy
    );
    console.log(data);
  }

  return (
    <div>
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
                editMealCompServings={editMealCompServings}
              />
            ))}
          </ul>
        </div>
      </form>
      <button onClick={handleSubmitChangesClick}>Submit Changes</button>
      <button onClick={props.handleCloseModal}>Cancel</button>
    </div>
  );
}

function EditMealFormMealComponentListItem(props: {
  mealComp: IMealComponent;
  removeFromMeal: (mealComponentId: string) => void;
  editMealCompServings: (mealComponentId: string, servings: number) => void;
}) {
  const { mealComp } = props;
  const [servings, setServings] = useState(String(mealComp.servings));
  const [isEditServingsActive, setIsEditServingsActive] = useState(false);

  function handleUpdateServingsClick() {
    setIsEditServingsActive(false);
    props.editMealCompServings(mealComp._id, Number(servings));
  }

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
          onClick={() => setIsEditServingsActive(true)}
          onChange={(evt) => setServings(evt.target.value)}
          type='number'
          id={'servings'}
          name={'servings'}
        />
        {isEditServingsActive && (
          <button type={'button'} onClick={handleUpdateServingsClick}>
            OK
          </button>
        )}
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
