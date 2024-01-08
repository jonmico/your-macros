import { IFood } from '../../types/food';
import styles from './your-food-form-food-builder.module.css';

export default function YourFoodFormFoodBuilder(props: {
  foodComponents: { food: IFood; servings: number }[];
}) {
  return (
    <div className={styles.yourFoodFormBuilderContainer}>
      {props.foodComponents.length === 0 ? (
        <div className={styles.noFoodsContainer}>
          <h3>Search the database for food items to build your custom food.</h3>
          <p>As you add food items, they will show up here.</p>
        </div>
      ) : (
        <ul>
          {props.foodComponents.map((foodComponent) => (
            <li key={foodComponent.food._id}>{foodComponent.food.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
