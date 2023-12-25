import styles from './log-history-table.module.css';

interface LogHistoryTableProps {
  children: React.ReactNode;
}

export default function LogHistoryTable({ children }: LogHistoryTableProps) {
  return <div className={styles.logHistoryTableContainer}>{children}</div>;
}
