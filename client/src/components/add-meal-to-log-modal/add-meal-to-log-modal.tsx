import styles from './add-meal-to-log-modal.module.css';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';
import useUser from '../../hooks/useUser';
import { useState } from 'react';
import AddMealToLogModalList from '../add-meal-to-log-modal-list/add-meal-to-log-modal-list';
import AddMealToLogModalListItem from '../add-meal-to-log-modal-list-item/add-meal-to-log-modal-list-item';
import { PrimaryButton } from '../button/button.styled';

interface SetShowModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMealToLogModal({ setShowModal }: SetShowModalProps) {
  const { user } = useUser();
  const [selectedLog, setIsSelectedLog] = useState('');

  const mostRecentLog = user.logs[user.logs.length - 1];

  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.idk}>
          <div className={styles.modalHeader}>
            <h3>Select the log:</h3>
            <button
              className={styles.closeButton}
              onClick={() => setShowModal(false)}
            >
              <FaXmark />
            </button>
          </div>
          <div className={styles.optionsContainer}>
            <div className={styles.optionContainer}>
              <h4>Most recent log:</h4>
              <div
                onClick={() => setIsSelectedLog(mostRecentLog._id)}
                className={`${styles.option} ${
                  selectedLog === mostRecentLog._id ? styles.selected : ''
                }`}
              >
                <div>{mostRecentLog?.name}</div>
                <div>
                  {new Date(mostRecentLog?.createdAt).toLocaleDateString(
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
            <div className={styles.optionContainer}>
              <h4>Select from a list of recent logs:</h4>
              <AddMealToLogModalList>
                {user.logs.map((log) => (
                  <AddMealToLogModalListItem log={log} />
                ))}
              </AddMealToLogModalList>
            </div>
          </div>
          <PrimaryButton>Add to Log</PrimaryButton>
        </div>
      </div>
    </div>,
    document.body
  );
}
