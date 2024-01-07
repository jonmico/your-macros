import { FoodProvider } from '../../contexts/food-context';
import { MealProvider } from '../../contexts/meal-context';
import FoodInfo from '../food-info/food-info';
import FoodSearch from '../food-search/food-search';
import styles from './your-food-form.module.css';

export default function YourFoodForm() {
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <div className={styles.searchContainer}>
      <MealProvider>
        <FoodProvider>
          <FoodSearch />
          <FoodInfo />
        </FoodProvider>
      </MealProvider>
    </div>
  );
}
