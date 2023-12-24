import styles from './create-log-form.module.css';
import { PrimaryButton } from '../button/button.styled';

export default function CreateLogForm() {
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }
  return (
    <form className={styles.createLogForm} onSubmit={handleSubmit}>
      <h3 className={styles.createLogFormHeader}>New Log</h3>
      <div className={styles.formFieldContainer}>
        <div className={styles.formField}>
          <label htmlFor='logName'>Log Name</label>
          <input
            className={styles.formInput}
            type='text'
            id={'logName'}
            name={'logName'}
          />
        </div>
        <PrimaryButton>Create</PrimaryButton>
      </div>
    </form>
  );
}
