import { createPortal } from 'react-dom';
import styles from './modal.module.css';

export default function Modal(props: { children: React.ReactNode }) {
  return createPortal(
    <div className={styles.modalContainer}>
      <div className={styles.modal}>{props.children}</div>
    </div>,
    document.body
  );
}
