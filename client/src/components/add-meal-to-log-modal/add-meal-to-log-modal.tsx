import styles from './add-meal-to-log-modal.module.css';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import useUser from '../../hooks/useUser';
import { useState } from 'react';
import AddMealToLogModalListItem from '../add-meal-to-log-modal-list-item/add-meal-to-log-modal-list-item';
import { IMeal } from '../../types/meal';
import { addMealToLog } from '../../services/user-api';
import { ILog } from '../../types/log';
import { useNavigate } from 'react-router-dom';

interface SetShowModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  meal: IMeal;
}

interface IData {
  logs: ILog[];
}

export default function AddMealToLogModal({
  setShowModal,
  meal,
}: SetShowModalProps) {
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState(
    user?.logs[user.logs.length - 1]
  );

  async function handleAddToMealClick() {
    if (selectedLog && user) {
      const data: IData = await addMealToLog(meal, selectedLog._id, user._id);
      console.log(data);
      setUser({ ...user, logs: data.logs });
      const updatedLog = data.logs.find((log) => log._id === selectedLog._id);

      if (updatedLog) {
        setSelectedLog(updatedLog);
      }

      navigate(`/logs/${selectedLog._id}`);
    }
  }

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Select the log</h3>
          <button
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            <FaXmark />
          </button>
        </div>
        <div className={styles.modalBody}>
          <div className={styles.modalSection}>
            <h4>Currently selected log:</h4>
            <div className={styles.selectedLog}>
              <div className={styles.nameDateContainer}>
                <div>
                  <div className={styles.selectedLogHeader}>Name</div>
                  <div>{selectedLog?.name}</div>
                </div>
                <div>
                  <div className={styles.selectedLogHeader}>Created Date</div>
                  <div>
                    {selectedLog &&
                      new Date(selectedLog.createdAt).toLocaleDateString(
                        'en-US',
                        {
                          month: 'numeric',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                  </div>
                </div>
              </div>
              <div className={styles.selectedLogRow}>
                {!selectedLog?.meals.length ? (
                  <div className={styles.noMealsText}>Nothing added yet.</div>
                ) : (
                  <>
                    <div>
                      <div className={styles.selectedLogHeader}>
                        Cals/Macros
                      </div>
                      <div className={styles.calsMacrosContainer}>
                        <div className={styles.cals}>
                          {selectedLog.calories}cals
                        </div>
                        <div className={styles.fat}>
                          {selectedLog.macros?.fat}f
                        </div>
                        <div className={styles.carbs}>
                          {selectedLog.macros?.carbs}c
                        </div>
                        <div className={styles.protein}>
                          {selectedLog.macros?.protein}p
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className={styles.selectedLogHeader}>Meals</div>
                      <div>{selectedLog?.meals.length}</div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
          <div className={styles.modalSection}>
            <h4>Select from a list of recent logs:</h4>
            <AddMealToLogModalList>
              {user?.logs.map((log) => (
                <AddMealToLogModalListItem
                  key={log._id}
                  log={log}
                  selectedLog={selectedLog}
                  setSelectedLog={setSelectedLog}
                />
              ))}
            </AddMealToLogModalList>
          </div>
        </div>
        <button className={styles.button} onClick={handleAddToMealClick}>
          Add to Log
        </button>
      </div>
    </div>,
    document.body
  );
}

function AddMealToLogModalList(props: { children: React.ReactNode }) {
  return <ul className={styles.addMealToLogModalList}>{props.children}</ul>;
}
