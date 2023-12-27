import { ILog } from '../../types/log';
import styles from './add-meal-to-log-modal-list-item.module.css';

interface AddMealToLogModalListItemProps {
  log: ILog;
  setIsSelectedLog: React.Dispatch<React.SetStateAction<string>>;
  selectedLog: string;
}

export default function AddMealToLogModalListItem({
  log,
  setIsSelectedLog,
  selectedLog,
}: AddMealToLogModalListItemProps) {
  return (
    <li
      className={`${styles.listItem} ${
        selectedLog === log._id ? styles.selected : ''
      }`}
      onClick={() => setIsSelectedLog(log._id)}
    >
      <div>{log.name}</div>
      <div>
        {new Date(log.createdAt).toLocaleDateString('en-US', {
          month: 'numeric',
          day: 'numeric',
          year: 'numeric',
        })}
      </div>
    </li>
  );
}
