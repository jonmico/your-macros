import styles from './log-meal-component-list-header.module.css';

export default function LogMealComponentListHeader() {
  return (
    <div className={styles.header}>
      <div className={styles.foodNameBrand}>Food Name/Brand</div>
      <div>Servings</div>
      <div>Calories/Macros</div>
    </div>
  );
}
