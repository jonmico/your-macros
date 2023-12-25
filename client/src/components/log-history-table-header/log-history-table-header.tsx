import styles from './log-history-table-header.module.css';

export default function LogHistoryTableHeader() {
  return (
    <div className={styles.logHistoryTableHeaderContainer}>
      <h4>Log Name</h4>
      <h4>Meals</h4>
      <h4>Total Macros</h4>
      <h4>Total Calories</h4>
    </div>
  );
}
