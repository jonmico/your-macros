import styles from './button.module.css';

interface ButtonProps {
  type: string;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  if (props.type === 'primary') {
    return (
      <button
        className={styles.primary}
        onClick={props.onClick}
        disabled={props.disabled}
      >
        {props.children}
      </button>
    );
  }

  if (props.type === 'small') {
    return (
      <button className={styles.small} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }
}
