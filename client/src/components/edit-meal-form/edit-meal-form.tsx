import { FaXmark } from 'react-icons/fa6';
import styles from './edit-meal-form.module.css';
import { IMeal } from '../../types/meal';
import { useState } from 'react';
import { IMealComponent } from '../../types/meal-component';

export default function EditMealForm(props: {
  handleCloseModal: () => void;
  mealToEdit: IMeal;
}) {
  const [mealToEditCopy, setMealToEditCopy] = useState({ ...props.mealToEdit });
  return (
    <form className={styles.editMealForm}>
      <div className={styles.editMealFormHeader}>
        <h2>Edit Meal</h2>
        <button onClick={props.handleCloseModal}>
          <FaXmark />
        </button>
      </div>
      <div>
        <ul className={styles.mealComponentList}>
          {mealToEditCopy.mealComponents.map((mealComp) => (
            <EditMealFormMealComponentListItem
              key={mealComp._id}
              mealComp={mealComp}
            />
          ))}
        </ul>
      </div>
    </form>
  );
}

function EditMealFormMealComponentListItem(props: {
  mealComp: IMealComponent;
}) {
  const { mealComp } = props;
  return (
    <li className={styles.mealComponentListItem}>
      <div>
        <div>{mealComp.food.name}</div>
        <div>{mealComp.food.brand}</div>
      </div>
      <div>
        <label htmlFor='servings'>Servings</label>
        <input type='number' id={'servings'} name={'servings'} />
      </div>
      <div>macro info</div>
      <div>
        <button>
          <FaXmark />
        </button>
      </div>
    </li>
  );
}
