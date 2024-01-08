import { useState } from 'react';
import { IFood } from '../../types/food';
import YourFoodFormSearch from '../your-food-form-search/your-food-form-search';
import styles from './your-food-form.module.css';

export default function YourFoodForm() {
  const [servings, setServings] = useState('1');
  const [foodComponents, setFoodComponents] = useState<
    {
      food: IFood;
      servings: number;
    }[]
  >([]);

  return (
    <div className={styles.yourFoodFormContainer}>
      <YourFoodFormSearch
        servings={servings}
        setServings={setServings}
        setFoodComponents={setFoodComponents}
      />
      <div>
        {foodComponents.map((food) => (
          <div key={food.food._id}>{food.food.name}</div>
        ))}
      </div>
    </div>
  );
}
