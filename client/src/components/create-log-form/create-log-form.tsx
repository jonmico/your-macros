import styles from './create-log-form.module.css';
import { PrimaryButton } from '../button/button.styled';
import { useState } from 'react';
import ILog from '../../types/log';
import useUser from '../../hooks/useUser';

export default function CreateLogForm() {
  const { user } = useUser();
  const [logName, setLogName] = useState('');
  const [logNameError, setLogNameError] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!logName) {
      setLogNameError('Please provide a name for the log.');
      return;
    }

    if (user) {
      const log: ILog = {
        name: logName,
        currentLog: true,
        author: user.id,
      };

      console.log(log);
    }
  }

  return (
    <form className={styles.createLogForm} onSubmit={handleSubmit}>
      <h3 className={styles.createLogFormHeader}>New Log</h3>
      <div className={styles.formFieldContainer}>
        <div className={styles.formField}>
          <label htmlFor='logName'>Log Name</label>
          <input
            value={logName}
            onChange={(evt) => {
              setLogName(evt.target.value);
              setLogNameError('');
            }}
            className={styles.formInput}
            type='text'
            id={'logName'}
            name={'logName'}
          />
          {logNameError && <p className={styles.formError}>{logNameError}</p>}
        </div>
        <PrimaryButton>Create</PrimaryButton>
      </div>
    </form>
  );
}
