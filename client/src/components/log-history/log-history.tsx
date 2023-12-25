import LogHistoryTableHeader from '../log-history-table-header/log-history-table-header';
import LogHistoryTable from '../log-history-table/log-history-table';
import useUser from '../../hooks/useUser';
import styles from './log-history.module.css';

export default function LogHistory() {
  const { user } = useUser();
  return (
    <div className={styles.logHistoryContainer}>
      <h3>History</h3>
      <LogHistoryTable>
        <LogHistoryTableHeader />
        {user?.logs.map((log) => (
          <div key={log._id}>{log.name}</div>
        ))}
      </LogHistoryTable>
    </div>
  );
}
