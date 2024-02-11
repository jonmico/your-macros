import { useEffect, useState } from 'react';
import { FaAngleRight, FaXmark } from 'react-icons/fa6';
import { useEditMeals } from '../../hooks/useEditMeals';
import useUser from '../../hooks/useUser';
import { IMeal } from '../../types/meal';
import { IMealComponent } from '../../types/meal-component';
import EditMealSearch from '../edit-meal-search/edit-meal-search';
import styles from './edit-meal.module.css';
import MealData from '../meal-data/meal-data';
import MacroDisplay from '../macro-display/macro-display';

export default function EditMeal(props: {
  handleCloseModal: () => void;
  mealToEditCopy: IMeal;
  userId: string;
  logId: string;
}) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { resetMeal } = useEditMeals();

  const { editMealInLog } = useUser();

  async function handleSubmitChangesClick() {
    await editMealInLog(props.userId, props.logId, props.mealToEditCopy);
  }

  const mealData = {
    calories: props.mealToEditCopy.calories,
    fat: props.mealToEditCopy.macros.fat,
    carbs: props.mealToEditCopy.macros.carbs,
    protein: props.mealToEditCopy.macros.protein,
  };

  return (
    <div className={styles.editMealContainer}>
      <div className={styles.editMeal}>
        <div className={styles.editMealHeader}>
          <h2>Edit Meal</h2>
          <button onClick={props.handleCloseModal}>
            <FaXmark />
          </button>
        </div>
        <MealData mealData={mealData} />
        <div>
          <div className={styles.mealComponentListContainer}>
            <ul className={styles.mealComponentList}>
              {props.mealToEditCopy.mealComponents.map((mealComp) => (
                <MealComponentListItem key={mealComp._id} mealComp={mealComp} />
              ))}
            </ul>
            <div className={styles.resetButtonContainer}>
              <button className={styles.resetMealButton} onClick={resetMeal}>
                Reset Meal
              </button>
            </div>
          </div>
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

function MealComponentListItem(props: { mealComp: IMealComponent }) {
  const { mealComp } = props;
  const { removeFromMeal, editMealCompServings } = useEditMeals();
  const [servings, setServings] = useState(String(mealComp.servings));
  const [isEditServingsActive, setIsEditServingsActive] = useState(false);

  useEffect(() => {
    setServings(String(mealComp.servings));
  }, [mealComp]);

  function handleUpdateServingsSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setIsEditServingsActive(false);
    editMealCompServings(mealComp._id, Number(servings));
  }

  return (
    <li className={styles.mealComponentListItem}>
      <div className={styles.foodNameBrand}>
        <div>{mealComp.food.name}</div>
        <div className={styles.foodBrand}>{mealComp.food.brand}</div>
      </div>
      <div className={styles.formContainer}>
        <form
          className={styles.servingsUpdateForm}
          onSubmit={(evt) => handleUpdateServingsSubmit(evt)}
        >
          <div className={styles.servingsUpdateFormFieldContainer}>
            <label htmlFor='servings'>Servings</label>
            <input
              className={styles.servingsUpdateInput}
              value={servings}
              onClick={() => setIsEditServingsActive(true)}
              onChange={(evt) => setServings(evt.target.value)}
              type='number'
              id={'servings'}
              name={'servings'}
            />
          </div>
          {isEditServingsActive && (
            <button className={styles.servingsUpdateSubmitButton}>OK</button>
          )}
        </form>
      </div>
      <MacroDisplay
        calories={props.mealComp.food.calories}
        macros={props.mealComp.food.macros}
        servings={props.mealComp.servings}
      />
      <div className={styles.removeFoodComponentButtonContainer}>
        <button
          className={styles.removeFoodComponentButton}
          type={'button'}
          onClick={() => removeFromMeal(mealComp._id)}
        >
          <FaXmark />
        </button>
      </div>
    </li>
  );
}
