import styles from './macro-display.module.css';

interface MacroDisplayProps {
  servings?: number;
  calories: number;
  macros: {
    fat: number;
    carbs: number;
    protein: number;
  };
}

export default function MacroDisplay({
  servings = 1,
  calories,
  macros,
}: MacroDisplayProps) {
  return (
    <div className={styles.macroDisplay}>
      <div className={styles.calories}>{calories * servings}cals</div>
      <div className={styles.fat}>{macros.fat * servings}f</div>
      <div className={styles.carbs}>{macros.carbs * servings}c</div>
      <div className={styles.protein}>{macros.protein * servings}p</div>
    </div>
  );
}
