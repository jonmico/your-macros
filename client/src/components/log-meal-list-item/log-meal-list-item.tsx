import { IMeal } from '../../types/meal';

import LogMealComponentListItem from '../log-meal-component-list-item/log-meal-component-list-item';

import useEditMeal from '../../hooks/useEditMeal';
import useUser from '../../hooks/useUser';
import EditMealInLogForm from '../edit-meal-in-log-form/edit-meal-in-log-form';
import styles from './log-meal-list-item.module.css';

interface LogMealListItemProps {
  userId: string;
  logId: string;
  meal: IMeal;
  index: number;
  mealLength: number;
}

export default function LogMealListItem({
  userId,
  logId,
  meal,
  index,
  mealLength,
}: LogMealListItemProps) {
  const { updateMeal, currentEditMeal, setCurrentEditMeal } = useEditMeal();
  const { deleteMealFromLog } = useUser();

  const isCurrentMealEdit = currentEditMeal?._id === meal._id;

  async function handleUpdateMeal() {
    await updateMeal(userId, logId, meal._id);
  }

  async function handleDeleteMealFromLog() {
    await deleteMealFromLog(meal._id, logId, userId);
  }

  return (
    <li
      className={`${styles.listItem} ${
        isCurrentMealEdit ? styles.editActive : ''
      }`}
    >
      <div className={styles.mealHeader}>
        <h3 className={styles.mealName}>{meal.name}</h3>
        <div className={styles.mealNumber}>
          Meal {index + 1} / {mealLength}
        </div>
      </div>
      <div className={styles.mealContent}>
        <div className={styles.macrosContainer}>
          <h4>Meal Totals</h4>
          <div className={styles.macros}>
            <div className={styles.calories}>
              <div>{meal.calories}</div>
              <div>cals</div>
            </div>
            <div className={styles.fat}>
              <div>{meal.macros.fat}g</div>
              <div>fat</div>
            </div>
            <div className={styles.carbs}>
              <div>{meal.macros.carbs}g</div>
              <div>carbs</div>
            </div>
            <div className={styles.protein}>
              <div>{meal.macros.protein}g</div>
              <div>protein</div>
            </div>
          </div>
        </div>
        <div className={styles.mealComponentListContainer}>
          {currentEditMeal ? (
            <EditMealInLogForm currentEditMeal={currentEditMeal} />
          ) : (
            <>
              <LogMealComponentListHeader />
              <ul className={styles.logMealComponentList}>
                {meal.mealComponents.map((mealComponent) => (
                  <LogMealComponentListItem
                    key={mealComponent.food._id}
                    mealComponent={mealComponent}
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
      <div className={styles.buttonRow}>
        <div className={styles.buttonsContainer}>
          {isCurrentMealEdit ? (
            <>
              <button
                className={`${styles.button} ${styles.updateMealButton}`}
                onClick={handleUpdateMeal}
              >
                Update Meal
              </button>
              <button
                className={`${styles.button} ${styles.deleteMealButton}`}
                onClick={handleDeleteMealFromLog}
              >
                Delete Meal
              </button>
              <button
                className={`${styles.button} ${styles.cancelEditButton}`}
                onClick={() => setCurrentEditMeal(null)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={() => setCurrentEditMeal(meal)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

function LogMealComponentListHeader() {
  return (
    <div className={styles.logMealComponentListHeader}>
      <div className={styles.foodNameBrand}>Food Name/Brand</div>
      <div>Servings</div>
      <div>Calories/Macros</div>
    </div>
  );
}
