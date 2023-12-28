import { ILog } from '../../types/log';
import styles from './add-meal-to-log-modal-list-item.module.css';

interface AddMealToLogModalListItemProps {
  log: ILog;
  setIsSelectedLog: React.Dispatch<React.SetStateAction<string>>;
  selectedLog: ILog;
}

export default function AddMealToLogModalListItem({
  log,
  setIsSelectedLog,
  selectedLog,
}: AddMealToLogModalListItemProps) {
  return (
    <li
      className={`${styles.listItem} ${
        selectedLog._id === log._id ? styles.selected : ''
      }`}
      onClick={() => setIsSelectedLog(log)}
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
