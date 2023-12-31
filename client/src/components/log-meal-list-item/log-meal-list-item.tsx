import { IMeal } from '../../types/meal';
import styles from './log-meal-list-item.module.css';
interface LogMealListItemProps {
  meal: IMeal;
}

export default function LogMealListItem({ meal }: LogMealListItemProps) {
  return (
    <li>
      <div className={styles.nameAndCalories}>
        <h3>{meal.name}</h3>
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
      {meal.mealComponents.map((mealComponent) => (
        <div>{mealComponent.food.name}</div>
      ))}
    </li>
  );
}
