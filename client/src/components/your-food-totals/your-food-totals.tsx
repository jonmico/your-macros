import styles from './your-food-totals.module.css';

export default function YourFoodTotals(props: {
  totals: {
    totalCals: number;
    totalFat: number;
    totalCarbs: number;
    totalProtein: number;
  };
}) {
  return (
    <div className={styles.yourFoodTotalsContainer}>
      <h3>YourFood Totals:</h3>
      <div className={styles.caloriesMacrosContainer}>
        <div className={`${styles.macroContainer} ${styles.calories}`}>
          <div>{props.totals.totalCals}g</div>
          <div>cals</div>
        </div>
        <div className={`${styles.macroContainer} ${styles.fat}`}>
          <div>{props.totals.totalFat}g</div>
          <div>fat</div>
        </div>
        <div className={`${styles.macroContainer} ${styles.carbs}`}>
          <div>{props.totals.totalCarbs}g</div>
          <div>carbs</div>
        </div>
        <div className={`${styles.macroContainer} ${styles.protein}`}>
          <div>{props.totals.totalProtein}g</div>
          <div>protein</div>
        </div>
      </div>
    </div>
  );
}
