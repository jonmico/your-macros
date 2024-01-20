import styles from './button.module.css';

interface ButtonProps {
  btnStyle: string;
  btnType?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  if (props.btnStyle === 'primary') {
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

  if (props.btnStyle === 'small') {
    return (
      <button className={styles.small} onClick={props.onClick}>
        {props.children}
      </button>
    );
  }

  if (props.btnStyle === 'close') {
    return (
      <button
        onClick={props.onClick}
        type={props.btnType}
        className={styles.close}
      >
        {props.children}
      </button>
    );
  }
}
