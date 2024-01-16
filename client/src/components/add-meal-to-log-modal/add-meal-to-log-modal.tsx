import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { IMeal } from '../../types/meal';
import AddMealToLogModalListItem from '../add-meal-to-log-modal-list-item/add-meal-to-log-modal-list-item';
import styles from './add-meal-to-log-modal.module.css';
import { useState } from 'react';
import { ILog } from '../../types/log';

interface SetShowModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  meal: IMeal;
}

export default function AddMealToLogModal({
  setShowModal,
  meal,
}: SetShowModalProps) {
  const {
    userState: { user },
    addMealToLog,
  } = useUser();
  const navigate = useNavigate();
  const [selectedLog, setSelectedLog] = useState<ILog | null>(null);

  async function handleAddToMealClick() {
    if (!user || !selectedLog) return null;

    await addMealToLog(meal, selectedLog._id, user._id);

    navigate(`/logs/${selectedLog._id}`);
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
            <ul className={styles.addMealToLogModalList}>
              {user?.logs.map((log) => (
                <AddMealToLogModalListItem
                  key={log._id}
                  log={log}
                  selectedLog={selectedLog}
                  setSelectedLog={setSelectedLog}
                />
              ))}
            </ul>
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
