import { IMeal } from '../../types/meal';
import LogMealComponentListItem from '../log-meal-component-list-item/log-meal-component-list-item';
import LogMealComponentList from '../log-meal-component-list/log-meal-component-list';
import styles from './log-meal-list-item.module.css';

interface LogMealListItemProps {
  meal: IMeal;
  index: number;
  mealLength: number;
}

export default function LogMealListItem({
  meal,
  index,
  mealLength,
}: LogMealListItemProps) {
  return (
    <li className={styles.listItem}>
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
        <LogMealComponentList>
          {meal.mealComponents.map((mealComponent) => (
            <LogMealComponentListItem mealComponent={mealComponent} />
          ))}
        </LogMealComponentList>
      </div>
    </li>
  );
}
