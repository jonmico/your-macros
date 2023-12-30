import LogHistoryTableHeader from '../log-history-table-header/log-history-table-header';
import LogHistoryTable from '../log-history-table/log-history-table';
import LogHistoryTableList from '../log-history-table-list/log-history-table-list';
import LogHistoryTableListItem from '../log-history-table-list-item/log-history-table-list-item';
import useUser from '../../hooks/useUser';
import styles from './log-history.module.css';

export default function LogHistory() {
  const { user } = useUser();
  return (
    <div className={styles.logHistoryContainer}>
      <h3>History</h3>
      <LogHistoryTable>
        <LogHistoryTableHeader />
        <LogHistoryTableList>
          {user.logs?.map((log) => (
            <LogHistoryTableListItem log={log} key={log._id} />
          ))}
        </LogHistoryTableList>
      </LogHistoryTable>
    </div>
  );
}
