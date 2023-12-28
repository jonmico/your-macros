import styles from './add-meal-to-log-modal.module.css';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import useUser from '../../hooks/useUser';
import { useState } from 'react';
import AddMealToLogModalList from '../add-meal-to-log-modal-list/add-meal-to-log-modal-list';
import AddMealToLogModalListItem from '../add-meal-to-log-modal-list-item/add-meal-to-log-modal-list-item';
import { PrimaryButton } from '../button/button.styled';
import { IMeal } from '../../types/meal';
import { addMealToLog } from '../../services/user-api';
import { ILog } from '../../types/log';

interface SetShowModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  meal: IMeal;
}

interface IData {
  logs: ILog[];
}

// FIXME: All of these early returns are bad.
export default function AddMealToLogModal({
  setShowModal,
  meal,
}: SetShowModalProps) {
  const { user, setUser } = useUser();

  const [selectedLog, setSelectedLog] = useState(
    user?.logs[user.logs.length - 1]
  );

  // TODO: How do we tell TS that user is already defined if we are here?
  if (!user) {
    return;
  }

  async function handleAddToMealClick() {
    if (!user) {
      return;
    }

    if (!selectedLog) {
      return;
    }

    const data: IData = await addMealToLog(meal, selectedLog._id, user._id);
    console.log(data);
    setUser({ ...user, logs: data.logs });
    setSelectedLog((prevLog) =>
      data.logs.find((log) => log._id === prevLog?._id)
    );
  }

  if (!selectedLog) {
    return;
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
              <div className={styles.selectedLogRow}>
                <div>
                  <div className={styles.selectedLogHeader}>Name</div>
                  <div>{selectedLog?.name}</div>
                </div>
                <div>
                  <div className={styles.selectedLogHeader}>Created Date</div>
                  <div>
                    {new Date(selectedLog.createdAt).toLocaleDateString(
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
                <div></div>
                <div>
                  <div className={styles.selectedLogHeader}>Meals</div>
                  <div>{selectedLog?.meals.length}</div>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.modalSection}>
            <h4>Select from a list of recent logs:</h4>
            <AddMealToLogModalList>
              {user.logs.map((log) => (
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
        <PrimaryButton onClick={handleAddToMealClick}>Add to Log</PrimaryButton>
      </div>
    </div>,
    document.body
  );
}
