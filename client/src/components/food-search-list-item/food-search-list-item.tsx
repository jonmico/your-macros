import { FaCirclePlus } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { useMeals } from '../../hooks/useMeals';
import { IFood } from '../../types/food';
import { IMealComponent } from '../../types/meal-component';

import styles from './food-search-list-item.module.css';

interface FoodSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: FoodSearchListItemProps) {
  const { brand, name, servingSize, calories } = props.food;
  const { handleSelectFood } = useFoods();
  const { addToMeal, mealComponents } = useMeals();

  const isInMealComponents = mealComponents
    .map(({ food }) => food)
    .includes(props.food);

  function handleSelectClick() {
    handleSelectFood(props.food);
  }

  function handleAddToMeal(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.stopPropagation();
    const mealComponent: IMealComponent = {
      food: props.food,
      servings: 1,
    };
    addToMeal(mealComponent);
  }

  return (
    <li className={styles.databaseListItem} onClick={handleSelectClick}>
      <button
        disabled={isInMealComponents}
        onClick={handleAddToMeal}
        className={styles.addButton}
      >
        <FaCirclePlus />
      </button>
      <div>
        <div>{name}</div>
        <div className={styles.brandName}>{brand}</div>
      </div>
      <div>{servingSize}g</div>
      <div>{calories}cals</div>
    </li>
  );
}
