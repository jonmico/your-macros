import { useState } from 'react';
import { IMeal } from '../../types/meal';

import LogMealComponentListItem from '../log-meal-component-list-item/log-meal-component-list-item';

import useUser from '../../hooks/useUser';
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
  const [isEditing, setIsEditing] = useState(false);
  const { deleteMealFromLog } = useUser();

  function handleEditClick() {
    setIsEditing(true);
  }

  async function handleDeleteMealFromLog() {
    // TODO: Look into this null check. Does id have to be optional on meal?
    if (!meal._id) return null; // Null check to make TS happy
    await deleteMealFromLog(meal._id, logId, userId);
  }

  return (
    <li className={`${styles.listItem} ${isEditing ? styles.editActive : ''}`}>
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
          <LogMealComponentListHeader />
          <ul className={styles.logMealComponentList}>
            {meal.mealComponents.map((mealComponent) => (
              <LogMealComponentListItem
                key={mealComponent.food._id}
                mealComponent={mealComponent}
              />
            ))}
          </ul>
        </div>
      </div>
      <div className={styles.buttonRow}>
        <div className={styles.buttonsContainer}>
          {isEditing ? (
            <>
              <button
                className={`${styles.button} ${styles.deleteMealButton}`}
                onClick={handleDeleteMealFromLog}
              >
                Delete Meal
              </button>
              <button
                className={`${styles.button} ${styles.cancelEditButton}`}
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              className={`${styles.button} ${styles.editButton}`}
              onClick={handleEditClick}
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
