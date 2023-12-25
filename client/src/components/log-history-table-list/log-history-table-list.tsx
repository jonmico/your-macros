import styles from './log-history-table-list.module.css';

interface LogHistoryTableListProps {
  children: React.ReactNode;
}

export default function LogHistoryTableList({
  children,
}: LogHistoryTableListProps) {
  return <ul className={styles.logHistoryTableList}>{children}</ul>;
}
