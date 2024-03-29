import styles from './create-log-form.module.css';
import { PrimaryButton } from '../button/button.styled';
import { useState } from 'react';
import useUser from '../../hooks/useUser';
import { IPreIDLog } from '../../types/pre-id-log';
import Input from '../input/input';
import { FaXmark } from 'react-icons/fa6';
import Button from '../button/button';

export default function CreateLogForm(props: { handleCloseModal: () => void }) {
  const {
    userState: { user },
    createLog,
  } = useUser();
  const [logName, setLogName] = useState('');
  const [logNameError, setLogNameError] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!logName) {
      setLogNameError('Please provide a name for the log.');
      return;
    }

    if (user) {
      const log: IPreIDLog = {
        name: logName,
        author: user._id,
      };
      await createLog(log);
    }
  }

  return (
    <form className={styles.createLogForm} onSubmit={handleSubmit}>
      <div className={styles.createLogFormHeader}>
        <h3>New Log</h3>
        <Button
          btnStyle={'close'}
          btnType={'button'}
          onClick={props.handleCloseModal}
        >
          <FaXmark />
        </Button>
      </div>
      <div className={styles.formFieldContainer}>
        <div className={styles.formField}>
          <label htmlFor='logName'>Log Name</label>
          <Input
            type={'text'}
            name={'logName'}
            id={'logName'}
            stateVal={logName}
            setStateFn={setLogName}
            errorText={logNameError}
            setErrorText={setLogNameError}
          />
        </div>
        <PrimaryButton type={'submit'}>Create</PrimaryButton>
      </div>
    </form>
  );
}
