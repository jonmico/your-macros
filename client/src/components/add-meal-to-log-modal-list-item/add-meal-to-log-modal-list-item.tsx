import { ILog } from '../../types/log';
import styles from './add-meal-to-log-modal-list-item.module.css';

interface AddMealToLogModalListItemProps {
  log: ILog;
}

export default function AddMealToLogModalListItem({
  log,
}: AddMealToLogModalListItemProps) {
  return (
    <li className={styles.listItem}>
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
