import useUser from '../../hooks/useUser';
import styles from './log-history.module.css';
import { ILog } from '../../types/log';
import { Link } from 'react-router-dom';

export default function LogHistory() {
  const { userState } = useUser();

  if (!userState.user) return null;

  const { user } = userState;

  return (
    <div className={styles.logHistoryContainer}>
      {user.logs.length === 0 ? (
        <div className={styles.noHistoryContainer}>
          <h3>Looks like you haven't made a log yet.</h3>
          <p>
            Click the <span className={styles.newLogText}>New Log</span> button
            above to get started.
          </p>
        </div>
      ) : (
        <>
          <h3>History</h3>
          <LogHistoryTable>
            <LogHistoryTableHeader />
            <LogHistoryTableList>
              {user.logs.map((log) => (
                <LogHistoryTableListItem log={log} key={log._id} />
              ))}
            </LogHistoryTableList>
          </LogHistoryTable>
        </>
      )}
    </div>
  );
}

function LogHistoryTable(props: { children: React.ReactNode }) {
  return (
    <div className={styles.logHistoryTableContainer}>{props.children}</div>
  );
}

function LogHistoryTableHeader() {
  return (
    <div className={styles.logHistoryTableHeaderContainer}>
      <h4>Log Name</h4>
      <h4>Meals</h4>
      <h4>Total Macros</h4>
      <h4>Total Calories</h4>
    </div>
  );
}

function LogHistoryTableList(props: { children: React.ReactNode }) {
  return <ul className={styles.logHistoryTableList}>{props.children}</ul>;
}

function LogHistoryTableListItem(props: { log: ILog }) {
  const { log } = props;

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
