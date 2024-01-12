import { FaCirclePlus } from 'react-icons/fa6';
import { IYourFood } from '../../types/your-food';
import styles from './your-food-search-list-item.module.css';
import { useMeals } from '../../hooks/useMeals';

export default function YourFoodSearchListItem(props: { yourFood: IYourFood }) {
  const { mealComponents } = useMeals();

  const isInMealComponents = mealComponents
    .map((mealComponent) => mealComponent.food)
    .includes(props.yourFood);

  return (
    <li className={styles.yourFoodListItem}>
      <button
        disabled={isInMealComponents}
        // onClick={handleAddToMeal}
        className={styles.addButton}
      >
        <FaCirclePlus />
      </button>
      <div className={styles.foodDataContainer}>
        <div>
          <div>
            <div>{props.yourFood.name}</div>
            <div>{props.yourFood.foodComponents.length} items</div>
          </div>
        </div>
        <div>
          <div>{props.yourFood.calories} cals</div>
          <div>{props.yourFood.servingSize}</div>
        </div>
      </div>
    </li>
  );
}
