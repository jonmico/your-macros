import { IMealComponent } from '../../types/meal-component';
import styles from './log-meal-component-list-item.module.css';

interface LogMealComponentListItemProps {
  mealComponent: IMealComponent;
}

export default function LogMealComponentListItem({
  mealComponent,
}: LogMealComponentListItemProps) {
  return <li>{mealComponent.food.name}</li>;
}
