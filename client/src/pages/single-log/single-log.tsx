import { useState } from 'react';
import { FaArrowLeft, FaXmark } from 'react-icons/fa6';
import { Link, useNavigate, useParams } from 'react-router-dom';
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
        {log.meals.length === 0 ? (
          <NoMealsInLogText />
        ) : (
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
        )}
        <div className={styles.deleteLogButtonRow}>
          <button onClick={handleModalOpen} className={styles.deleteLogButton}>
            Delete Log
          </button>
          {isModalOpen && (
            <Modal>
              <DeleteLogForm
                log={log}
                handleModalClose={handleModalClose}
                userId={user._id}
              />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}

function NoMealsInLogText() {
  return (
    <div className={styles.noMealsInLogText}>
      <h3>There aren't any meals added to this log yet!</h3>
      <Link to={'/add-meal'}>Add a meal now</Link>
    </div>
  );
}

function LogMealList(props: { children: React.ReactNode }) {
  return <ul className={styles.logMealList}>{props.children}</ul>;
}

function DeleteLogForm(props: {
  log: ILog;
  handleModalClose: () => void;
  userId: string;
}) {
  const [isSure, setIsSure] = useState(false);
  const [logName, setLogName] = useState('');
  const [isDeleteDisabled, setIsDeleteDisabled] = useState(true);
  const navigate = useNavigate();
  const { deleteLog } = useUser();

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

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    await deleteLog(props.log._id, props.userId);
    navigate('/logs');
  }
  return (
    <form onSubmit={handleSubmit} className={styles.deleteLogForm}>
      <div>
        <div className={styles.formHeader}>
          <h2>Hold up there, partner!</h2>
          <button
            type={'button'}
            onClick={props.handleModalClose}
            className={styles.closeModalButton}
          >
            <FaXmark />
          </button>
        </div>
        <div>Are you sure you want to delete this log?</div>
      </div>

      {!isSure && (
        <button
          className={`${styles.button} ${styles.dontWantToDoThatButton}`}
          type={'button'}
          onClick={props.handleModalClose}
        >
          You're right! I don't want to do that!
        </button>
      )}
      <button
        className={`${styles.button} ${styles.deleteItButton}`}
        type={'button'}
        onClick={handleIsSure}
      >
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
              <input
                className={styles.logNameInput}
                type='text'
                value={logName}
                onChange={handleOnChange}
              />
            </div>
          </div>
          <button
            type={'submit'}
            className={styles.deleteButton}
            disabled={isDeleteDisabled}
          >
            Delete
          </button>
        </>
      )}
    </form>
  );
}
