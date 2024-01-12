import { SetStateAction } from 'react';

import styles from './input.module.css';

interface InputProps {
  type: string;
  name: string;
  id: string;
  stateVal: string;
  setStateFn: React.Dispatch<SetStateAction<string>>;
  errorText?: string;
  setErrorText?: React.Dispatch<SetStateAction<string>>;
}

export default function Input(props: InputProps) {
  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (props.setErrorText) {
      props.setErrorText('');
    }
    props.setStateFn(evt.target.value);
  }

  return (
    <div className={styles.inputContainer}>
      <input
        className={styles.input}
        type={props.type}
        name={props.name}
        id={props.id}
        value={props.stateVal}
        onChange={handleOnChange}
      />
      {props.errorText && (
        <div className={styles.errorText}>{props.errorText}</div>
      )}
    </div>
  );
}
