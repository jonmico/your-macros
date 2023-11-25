import { useState } from 'react';
import styles from './create-food-form.module.css';

export default function CreateFoodForm() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [servingSize, setServingSize] = useState('');
  const [servingSizeError, setServingSizeError] = useState('');

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('Form submitted!');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor='brand'>
          Brand
        </label>
        <input id={'brand'} type='text' />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor='name'>
          Name
        </label>
        <input id={'name'} type='text' />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor='servingSize'>
          Serving Size
        </label>
        <input id={'servingSize'} type='number' />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor='carbs'>
          Carbs
        </label>
        <input id={'carbs'} type='number' />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor='fats'>
          Fats
        </label>
        <input id={'fats'} type='number' />
      </div>
      <div className={styles.formField}>
        <label className={styles.formLabel} htmlFor='protein'>
          Protein
        </label>
        <input id={'protein'} type='number' />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
