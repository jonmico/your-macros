import styles from './log-meal-list.module.css';

interface LogMealListProps {
  children: React.ReactNode;
}

export default function LogMealList({ children }: LogMealListProps) {
  return <ul className={styles.list}>{children}</ul>;
}
