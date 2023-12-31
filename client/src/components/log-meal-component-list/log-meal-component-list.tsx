import styles from './log-meal-component-list.module.css';

interface LogMealComponentListProps {
  children: React.ReactNode;
}

export default function LogMealComponentList({
  children,
}: LogMealComponentListProps) {
  return <ul className={styles.list}>{children}</ul>;
}
