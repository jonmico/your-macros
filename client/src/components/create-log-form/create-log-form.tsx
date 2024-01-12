import styles from './create-log-form.module.css';
import { PrimaryButton } from '../button/button.styled';
import { useState } from 'react';
import { ILog } from '../../types/log';
import useUser from '../../hooks/useUser';
import { createLog } from '../../services/user-api';
import { IPreIDLog } from '../../types/pre-id-log';
import Input from '../input/input';

interface ICreateLogData {
  logs: ILog[];
}

export default function CreateLogForm() {
  const { user, setUser, setLogs, setSelectedLog } = useUser();
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

      // TODO: Error handling?
      const data: ICreateLogData = await createLog(log);
      setUser({ ...user, logs: data.logs });
      setLogs(data.logs);
      setSelectedLog(data.logs[data.logs.length - 1]);
      console.log(data);
    }
  }

  return (
    <form className={styles.createLogForm} onSubmit={handleSubmit}>
      <h3 className={styles.createLogFormHeader}>New Log</h3>
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
        <PrimaryButton>Create</PrimaryButton>
      </div>
    </form>
  );
}
