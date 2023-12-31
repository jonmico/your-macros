import { IMealComponent } from '../../types/meal-component';
import MacroDisplay from '../macro-display/macro-display';
import styles from './log-meal-component-list-item.module.css';

interface LogMealComponentListItemProps {
  mealComponent: IMealComponent;
}

export default function LogMealComponentListItem({
  mealComponent,
}: LogMealComponentListItemProps) {
  return (
    <li className={styles.listItem}>
      <div>
        <div>{mealComponent.food.name}</div>
        <div className={styles.brand}>{mealComponent.food.brand}</div>
      </div>
      <MacroDisplay
        calories={mealComponent.food.calories}
        macros={mealComponent.food.macros}
        servings={mealComponent.servings}
      />
    </li>
  );
}
