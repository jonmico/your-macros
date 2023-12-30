import { Link } from 'react-router-dom';
import { ILog } from '../../types/log';
import styles from './log-history-table-list-item.module.css';

interface LogHistoryTableListItemProps {
  log: ILog;
}

export default function LogHistoryTableListItem({
  log,
}: LogHistoryTableListItemProps) {
  return (
    <li className={styles.logHistoryTableListItem}>
      <div>{log.name}</div>
      <div>{log.meals.length}</div>
      <div>
        {log.macros.carbs} {log.macros.fat} {log.macros.protein}
      </div>
      <div>{log.calories}</div>
      <div>
        <Link className={styles.link} to={`/logs/${log._id}`}>
          VIEW
        </Link>
      </div>
    </li>
  );
}
