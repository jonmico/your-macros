import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link, useParams } from 'react-router-dom';
import LogMealListItem from '../../components/log-meal-list-item/log-meal-list-item';
import Modal from '../../components/modal/modal';
import useUser from '../../hooks/useUser';
import { ILog } from '../../types/log';
import styles from './single-log.module.css';

export default function SingleLog() {
  const {
    userState: { user },
  } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { logId } = useParams();

  if (!user) return null;

  const log = user.logs.find((log) => log._id === logId);

  if (!log) {
    return <div>Hmm. Looks like we can't find that log!</div>;
  }

  const date = new Date(log.createdAt).toDateString();

  function handleModalOpen() {
    setIsModalOpen(true);
  }

  function handleModalClose() {
    setIsModalOpen(false);
  }

  return (
    <div className={styles.pageContainer}>
      <Link className={styles.link} to={'/logs'}>
        <FaArrowLeft /> <div>Back to Logs</div>
      </Link>
      <div className={styles.logContainer}>
        <div className={styles.nameAndDate}>
          <h2>{log.name}</h2>
          <div>
            <h4>Created:</h4>
            <div>{date}</div>
          </div>
        </div>
        <div className={styles.macrosContainer}>
          <div className={styles.logTotalsText}>Log Totals:</div>
          <div className={styles.calories}>{log.calories}cals</div>
          <div className={styles.fat}>{log.macros.fat}f</div>
          <div className={styles.carbs}>{log.macros.carbs}c</div>
          <div className={styles.protein}>{log.macros.protein}p</div>
        </div>
        <LogMealList>
          {log.meals.map((meal, index) => (
            <LogMealListItem
              key={meal._id}
              meal={meal}
              index={index}
              mealLength={log.meals.length}
            />
          ))}
        </LogMealList>
        <div className={styles.deleteLogButtonRow}>
          <button onClick={handleModalOpen} className={styles.deleteLogButton}>
            Delete Log
          </button>
          {isModalOpen && (
            <Modal>
              <DeleteLogForm log={log} handleModalClose={handleModalClose} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

function LogMealList(props: { children: React.ReactNode }) {
  return <ul className={styles.logMealList}>{props.children}</ul>;
}

// TODO: Make API call to database to delete the log.
function DeleteLogForm(props: { log: ILog; handleModalClose: () => void }) {
  const [isSure, setIsSure] = useState(false);
  const [logName, setLogName] = useState('');
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);

  function handleIsSure() {
    setIsSure((prevState) => !prevState);
  }

  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    setLogName(evt.target.value);

    if (evt.target.value === props.log.name) {
      setIsDeleteDisabled(false);
    } else {
      setIsDeleteDisabled(true);
    }
  }

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('NYI: Call to database to delete the log.');
  }
  return (
    <form onSubmit={handleSubmit} className={styles.deleteLogForm}>
      <div>
        <h2>Hold up there, partner!</h2>
        <div>Are you sure you want to delete this log?</div>
      </div>

      {!isSure && (
        <button type={'button'} onClick={props.handleModalClose}>
          You're right! I don't want to do that!
        </button>
      )}
      <button type={'button'} onClick={handleIsSure}>
        {isSure ? 'Wait! Take me back!' : 'I am sure I want to delete this log'}
      </button>
      {isSure && (
        <>
          <div className={styles.confirmDeleteDialogue}>
            <h4>
              To delete, type the name of this log {'('}
              <span className={styles.logName}>{props.log.name}</span>
              {')'} below:
            </h4>
            <div className={styles.formFieldContainer}>
              <label htmlFor='logName'>Log Name</label>
              <input type='text' value={logName} onChange={handleOnChange} />
            </div>
          </div>
          <button className={styles.deleteButton} disabled={isDeleteDisabled}>
            Delete
          </button>
        </>
      )}
    </form>
  );
}
