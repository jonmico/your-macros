import { useState } from 'react';
import { IFood } from '../../types/food';
import styles from './your-food-form-food-builder.module.css';
import YourFoodTotals from '../your-food-totals/your-food-totals';
import useUser from '../../hooks/useUser';
import { calcCaloriesMacros } from '../../utils/calcCaloriesMacros';
import { createYourFood } from '../../services/user-api';

export default function YourFoodFormFoodBuilder(props: {
  foodComponents: { food: IFood; servings: number }[];
}) {
  const [yourFoodName, setYourFoodName] = useState('');
  const [yourFoodServing, setYourFoodServing] = useState('');
  const { user } = useUser();

  const { totalCals, totalCarbs, totalFat, totalProtein } = calcCaloriesMacros(
    props.foodComponents
  );

  async function handleCreateYourFood() {
    if (!user) return null;

    const newYourFood = {
      author: user._id,
      foodComponents: props.foodComponents,
      name: yourFoodName,
      servingSize: yourFoodServing,
      calories: totalCals,
      macros: {
        fat: totalFat,
        carbs: totalCarbs,
        protein: totalProtein,
      },
    };

    const data = await createYourFood(newYourFood);

    console.log(data);
  }

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
              <h3>YourFood Name</h3>
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
          <YourFoodTotals
            totals={{ totalCals, totalCarbs, totalFat, totalProtein }}
          />
          <div className={styles.servingSizeContainer}>
            <label htmlFor='servings'>
              <h3>Serving Size</h3>
            </label>
            <input
              value={yourFoodServing}
              onChange={(evt) => setYourFoodServing(evt.target.value)}
              type='text'
              name={'servings'}
              id={'servings'}
              placeholder={'1 sandwich, 1 slice, etc.'}
              className={styles.servingSizeInput}
            />
          </div>
          <div>
            <div className={styles.formBuilderHeader}>
              <div>Name/Brand</div>
              <div>Servings</div>
              <div>Calories/Macros</div>
            </div>
            <ul className={styles.formBuilderList}>
              {props.foodComponents.map((foodComponent) => (
                <YourFoodFormBuilderListItem
                  key={foodComponent.food._id}
                  foodComponent={foodComponent}
                />
              ))}
            </ul>
          </div>

          <button
            onClick={handleCreateYourFood}
            className={styles.yourFoodButton}
          >
            Create YourFood
          </button>
        </>
      )}
    </div>
  );
}

function YourFoodFormBuilderListItem(props: {
  foodComponent: { food: IFood; servings: number };
}) {
  const totalCals =
    props.foodComponent.food.calories * props.foodComponent.servings;
  const totalFat =
    props.foodComponent.food.macros.fat * props.foodComponent.servings;
  const totalCarbs =
    props.foodComponent.food.macros.carbs * props.foodComponent.servings;
  const totalProtein =
    props.foodComponent.food.macros.protein * props.foodComponent.servings;
  return (
    <li className={styles.formBuilderListItem}>
      <div>
        <div>{props.foodComponent.food.name}</div>
        <div className={styles.foodBrand}>{props.foodComponent.food.brand}</div>
      </div>
      <div>{props.foodComponent.servings}</div>
      <div className={styles.caloriesMacrosContainer}>
        <div className={styles.calories}>{totalCals}cals</div>
        <div className={styles.fat}>{totalFat}f</div>
        <div className={styles.carbs}>{totalCarbs}c</div>
        <div className={styles.protein}>{totalProtein}p</div>
      </div>
    </li>
  );
}
