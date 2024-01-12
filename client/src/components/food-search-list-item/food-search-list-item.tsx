import { FaCirclePlus } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { useMeals } from '../../hooks/useMeals';
import { IMealComponent } from '../../types/meal-component';

import { IFood } from '../../types/food';
import styles from './food-search-list-item.module.css';
import { IYourFood } from '../../types/your-food';

interface DatabaseSearchListItemProps {
  food: IFood | IYourFood;
}
export default function FoodSearchListItem(props: DatabaseSearchListItemProps) {
  const { name, servingSize, calories } = props.food;

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

  if ('foodComponents' in props.food) {
    return (
      <li className={styles.foodSearchListItem} onClick={handleSelectClick}>
        <button
          disabled={isInMealComponents}
          onClick={handleAddToMeal}
          className={styles.addButton}
        >
          <FaCirclePlus />
        </button>
        <div className={styles.foodDataContainer}>
          <div>
            <div>
              <div>{props.food.name}</div>
              <div>{props.food.foodComponents.length} items</div>
            </div>
          </div>
          <div>
            <div>{props.food.calories} cals</div>
            <div>{props.food.servingSize}</div>
          </div>
        </div>
      </li>
    );
  }

  return (
    <li className={styles.foodSearchListItem} onClick={handleSelectClick}>
      <button
        disabled={isInMealComponents}
        onClick={handleAddToMeal}
        className={styles.addButton}
      >
        <FaCirclePlus />
      </button>
      <div className={styles.foodDataContainer}>
        <div>
          <div>
            <div>{name}</div>
            <div className={styles.brandName}>{props.food.brand}</div>
          </div>
        </div>
        <div>
          <div>{calories} calories</div>
          <div>{servingSize}g</div>
        </div>
      </div>
    </li>
  );
}
