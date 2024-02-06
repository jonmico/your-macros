import { useState } from 'react';
import { FaXmark } from 'react-icons/fa6';
import useUser from '../../hooks/useUser';
import { IMeal } from '../../types/meal';
import { IMealComponent } from '../../types/meal-component';
import { calcCaloriesMacros } from '../../utils/calcCaloriesMacros';
import styles from './edit-meal-form.module.css';

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
  const { editMealInLog } = useUser();

  function removeFromMeal(mealComponentId: string | undefined) {
    if (mealComponentId === undefined) return;
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

  function editMealCompServings(
    mealComponentId: string | undefined,
    servings: number
  ) {
    if (mealComponentId === undefined) return;
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
    await editMealInLog(props.userId, props.logId, mealToEditCopy);
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
      <div className={styles.buttonContainer}>
        <button
          className={styles.submitChangesButton}
          onClick={handleSubmitChangesClick}
        >
          Submit Changes
        </button>
        <button
          className={styles.cancelButton}
          onClick={props.handleCloseModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

function EditMealFormMealComponentListItem(props: {
  mealComp: IMealComponent;
  removeFromMeal: (mealComponentId: string | undefined) => void;
  editMealCompServings: (
    mealComponentId: string | undefined,
    servings: number
  ) => void;
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
