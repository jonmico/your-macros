import { useState } from 'react';
import { FaAngleRight, FaXmark } from 'react-icons/fa6';
import useUser from '../../hooks/useUser';
import { IMeal } from '../../types/meal';
import { IMealComponent } from '../../types/meal-component';
import { calcCaloriesMacros } from '../../utils/calcCaloriesMacros';
import styles from './edit-meal.module.css';
import EditMealSearch from '../edit-meal-search/edit-meal-search';
import { useEditMeals } from '../../hooks/useEditMeals';

export default function EditMeal(props: {
  handleCloseModal: () => void;
  mealToEditCopy: IMeal;
  userId: string;
  logId: string;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { setMealToEditCopy } = useEditMeals();

  const { editMealInLog } = useUser();

  function removeFromMeal(mealComponentId: string | undefined) {
    if (mealComponentId === undefined) return;
    const filteredMealComponents = props.mealToEditCopy.mealComponents.filter(
      (mealComp) => mealComp._id !== mealComponentId
    );

    const { totalCals, totalCarbs, totalFat, totalProtein } =
      calcCaloriesMacros(filteredMealComponents);

    const updatedMeal: IMeal = {
      ...props.mealToEditCopy,
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
    const updatedMealComponents = props.mealToEditCopy.mealComponents.map(
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
      ...props.mealToEditCopy,
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
    await editMealInLog(props.userId, props.logId, props.mealToEditCopy);
  }

  return (
    <div className={styles.editMealContainer}>
      <div className={styles.editMeal}>
        <div className={styles.editMealHeader}>
          <h2>Edit Meal</h2>
          <button onClick={props.handleCloseModal}>
            <FaXmark />
          </button>
        </div>
        <div>
          <ul className={styles.mealComponentList}>
            {props.mealToEditCopy.mealComponents.map((mealComp) => (
              <MealComponentListItem
                key={mealComp._id}
                mealComp={mealComp}
                removeFromMeal={removeFromMeal}
                editMealCompServings={editMealCompServings}
              />
            ))}
          </ul>
        </div>
        <div className={styles.editMealSearchContainer}>
          <div
            className={styles.searchDropDownContainer}
            onClick={() => setIsSearchOpen((prevState) => !prevState)}
          >
            <FaAngleRight
              className={`${isSearchOpen ? styles.searchActive : ''}`}
            />
            <div>Search for and add additional foods</div>
          </div>
          {isSearchOpen && <EditMealSearch />}
        </div>
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
    </div>
  );
}

function MealComponentListItem(props: {
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

  function handleUpdateServingsSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsEditServingsActive(false);
    props.editMealCompServings(mealComp._id, Number(servings));
  }

  return (
    <li className={styles.mealComponentListItem}>
      <div className={styles.foodNameBrand}>
        <div>{mealComp.food.name}</div>
        <div>{mealComp.food.brand}</div>
      </div>
      <form onSubmit={(evt) => handleUpdateServingsSubmit(evt)}>
        <label htmlFor='servings'>Servings</label>
        <input
          value={servings}
          onClick={() => setIsEditServingsActive(true)}
          onChange={(evt) => setServings(evt.target.value)}
          type='number'
          id={'servings'}
          name={'servings'}
        />
        {isEditServingsActive && <button>OK</button>}
      </form>
      <div>macro info</div>
      <div className={styles.removeFoodComponentButtonContainer}>
        <button
          className={styles.removeFoodComponentButton}
          type={'button'}
          onClick={() => props.removeFromMeal(mealComp._id)}
        >
          <FaXmark />
        </button>
      </div>
    </li>
  );
}
