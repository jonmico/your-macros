import styles from './create-food-form.module.css';

export default function CreateFoodForm() {
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('Form submitted!');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div>
        <label htmlFor='name'>Name</label>
        <input type='text' />
      </div>
      <div>
        <label htmlFor='servingSize'>Serving Size</label>
        <input type='text' />
      </div>
      <div>
        <label htmlFor='carbs'>Carbs</label>
        <input type='number' min={0} max={999} />
      </div>
      <div>
        <label htmlFor='fats'>Fats</label>
        <input type='number' min={0} max={999} />
      </div>
      <div>
        <label htmlFor='protein'>Protein</label>
        <input type='number' min={0} max={999} />
      </div>
      <div>
        <button>Submit</button>
      </div>
    </form>
  );
}
