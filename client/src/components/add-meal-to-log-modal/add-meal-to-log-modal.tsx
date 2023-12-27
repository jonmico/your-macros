import styles from './add-meal-to-log-modal.module.css';
import { createPortal } from 'react-dom';
import { FaXmark } from 'react-icons/fa6';

interface SetShowModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMealToLogModal({ setShowModal }: SetShowModalProps) {
  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h3>Select the log:</h3>
          <button
            className={styles.closeButton}
            onClick={() => setShowModal(false)}
          >
            <FaXmark />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}
