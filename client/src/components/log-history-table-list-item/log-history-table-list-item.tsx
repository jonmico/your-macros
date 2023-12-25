import ILog from '../../types/log';
import styles from './log-history-table-list-item.module.css';

interface LogHistoryTableListItemProps {
  log: ILog;
}

export default function LogHistoryTableListItem({
  log,
}: LogHistoryTableListItemProps) {
  return <li className={styles.logHistoryTableListItem}>{log.name}</li>;
}
