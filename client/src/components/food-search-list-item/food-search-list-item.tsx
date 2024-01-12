import { FaCirclePlus } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { useMeals } from '../../hooks/useMeals';
import { IMealComponent } from '../../types/meal-component';

import { IFood } from '../../types/food';
import styles from './food-search-list-item.module.css';

interface DatabaseSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: DatabaseSearchListItemProps) {
  const { name, servingSize, calories } = props.food;

  const { handleSelectFood, selectedFood } = useFoods();
  const {
    addToMeal,
    mealComponents,
    mealComponentsError,
    setMealComponentsError,
  } = useMeals();

  const isSelectedFood =
    selectedFood?._id === props.food._id ? styles.activeFood : '';

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
    if (mealComponentsError) setMealComponentsError('');
  }

  return (
    <li
      className={`${styles.foodSearchListItem} ${isSelectedFood}`}
      onClick={handleSelectClick}
    >
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
