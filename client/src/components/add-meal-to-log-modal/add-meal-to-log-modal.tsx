import styles from './add-meal-to-log-modal.module.css';
import { createPortal } from 'react-dom';

interface SetShowModalProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMealToLogModal({ setShowModal }: SetShowModalProps) {
  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>
        <button onClick={() => setShowModal(false)}>CLOSE</button>
        <h1>HOWDY</h1>
      </div>
    </div>,
    document.body
  );
}
