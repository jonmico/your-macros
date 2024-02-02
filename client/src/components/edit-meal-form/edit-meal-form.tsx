import { FaXmark } from 'react-icons/fa6';
import styles from './edit-meal-form.module.css';

export default function EditMealForm(props: { handleCloseModal: () => void }) {
  return (
    <form>
      <div className={styles.editMealFormHeader}>
        <h2>Edit Meal</h2>
        <button onClick={props.handleCloseModal}>
          <FaXmark />
        </button>
      </div>
    </form>
  );
}
