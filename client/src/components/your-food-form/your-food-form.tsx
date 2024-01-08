import { useState } from 'react';
import { FaAngleLeft } from 'react-icons/fa6';
import { IFood } from '../../types/food';
import YourFoodFormFoodBuilder from '../your-food-form-food-builder/your-food-form-food-builder';
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
      <YourFoodsInfo />
      <div className={styles.yourFoodFormRow}>
        <YourFoodFormSearch
          servings={servings}
          setServings={setServings}
          setFoodComponents={setFoodComponents}
        />
        <YourFoodFormFoodBuilder foodComponents={foodComponents} />
      </div>
    </div>
  );
}

function YourFoodsInfo() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={`${styles.yourFoodInfoContainer} ${
        isOpen ? styles.yourFoodInfoContainerOpen : ''
      }`}
    >
      <div
        className={styles.yourFoodInfoHeader}
        onClick={() => setIsOpen((prevState) => !prevState)}
      >
        <h4>YourFoods Info</h4>
        <button
          className={`${styles.yourFoodInfoButton} ${
            isOpen ? styles.animateArrow : ''
          }`}
        >
          <FaAngleLeft />
        </button>
      </div>
      {isOpen && (
        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Blanditiis
          libero consequatur nobis. Esse laboriosam, accusantium odit architecto
          voluptas odio repellat rerum exercitationem. Quisquam esse perferendis
          aut nisi hic, atque laboriosam. Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eaque, ad veniam quod excepturi officia et nam
          doloremque ducimus nulla harum iusto fugit culpa fugiat eos animi,
          maiores laudantium veritatis aperiam?
        </p>
      )}
    </div>
  );
}
