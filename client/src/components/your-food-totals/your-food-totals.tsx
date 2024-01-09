import { IFood } from '../../types/food';
import styles from './your-food-totals.module.css';

export default function YourFoodTotals(props: {
  foodComponents: {
    food: IFood;
    servings: number;
  }[];
}) {
  const totalCals = props.foodComponents.reduce(
    (prev, curr) => prev + curr.food.calories * curr.servings,
    0
  );
  const totalFat = props.foodComponents.reduce(
    (prev, curr) => prev + curr.food.macros.fat * curr.servings,
    0
  );
  const totalCarbs = props.foodComponents.reduce(
    (prev, curr) => prev + curr.food.macros.carbs * curr.servings,
    0
  );
  const totalProtein = props.foodComponents.reduce(
    (prev, curr) => prev + curr.food.macros.protein * curr.servings,
    0
  );
  return (
    <div className={styles.yourFoodTotalsContainer}>
      <h3>YourFood Totals:</h3>
      <div className={styles.caloriesMacrosContainer}>
        <div className={`${styles.macroContainer} ${styles.calories}`}>
          <div>{totalCals}g</div>
          <div>cals</div>
        </div>
        <div className={`${styles.macroContainer} ${styles.fat}`}>
          <div>{totalFat}g</div>
          <div>fat</div>
        </div>
        <div className={`${styles.macroContainer} ${styles.carbs}`}>
          <div>{totalCarbs}g</div>
          <div>carbs</div>
        </div>
        <div className={`${styles.macroContainer} ${styles.protein}`}>
          <div>{totalProtein}g</div>
          <div>protein</div>
        </div>
      </div>
    </div>
  );
}
