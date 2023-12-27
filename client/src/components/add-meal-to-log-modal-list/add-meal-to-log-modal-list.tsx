import styles from './add-meal-to-log-modal-list.module.css';

interface AddMealToLogModalListProps {
  children: React.ReactNode;
}

export default function AddMealToLogModalList({
  children,
}: AddMealToLogModalListProps) {
  return <ul className={styles.list}>{children}</ul>;
}
