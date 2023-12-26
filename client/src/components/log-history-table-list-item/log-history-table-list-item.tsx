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
        {log.macros ? (
          <>
            {log.macros.carbs} {log.macros.fat} {log.macros.protein}
          </>
        ) : (
          0
        )}
      </div>
      <div>{log.calories ? log.calories : 0}</div>
    </li>
  );
}
