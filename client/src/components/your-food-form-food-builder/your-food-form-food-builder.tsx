import { useState } from 'react';
import { IFood } from '../../types/food';
import styles from './your-food-form-food-builder.module.css';

export default function YourFoodFormFoodBuilder(props: {
  foodComponents: { food: IFood; servings: number }[];
}) {
  const [yourFoodName, setYourFoodName] = useState('');

  return (
    <div className={styles.yourFoodFormBuilderContainer}>
      {props.foodComponents.length === 0 ? (
        <div className={styles.noFoodsContainer}>
          <h3>Search the database for food items to build your custom food.</h3>
          <p>As you add food items, they will show up here.</p>
        </div>
      ) : (
        <>
          <div className={styles.mealNameInputContainer}>
            <label className={styles.mealNameLabel} htmlFor='yourFoodName'>
              YourFood Name
            </label>
            <input
              className={styles.mealNameInput}
              placeholder={'my favorite dish, etc'}
              type='text'
              name={'yourFoodName'}
              id={'yourFoodName'}
              value={yourFoodName}
              onChange={(evt) => setYourFoodName(evt.target.value)}
            />
          </div>
          <div className={styles.formBuilderListContainer}>
            <ul className={styles.formBuilderList}>
              {props.foodComponents.map((foodComponent) => (
                <YourFoodFormBuilderListItem
                  key={foodComponent.food._id}
                  foodComponent={foodComponent}
                />
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

function YourFoodFormBuilderListItem(props: {
  foodComponent: { food: IFood; servings: number };
}) {
  return (
    <li className={styles.formBuilderListItem}>
      <div>{props.foodComponent.food.name}</div>
      <div>{props.foodComponent.servings}</div>
      <div>{props.foodComponent.food.calories}</div>
    </li>
  );
}
