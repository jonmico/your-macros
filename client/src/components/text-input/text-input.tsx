import { SetStateAction } from 'react';

import styles from './text-input.module.css';

interface TextInputProps {
  name: string;
  id: string;
  stateVal: string;
  setStateFn: React.Dispatch<SetStateAction<string>>;
  errorText?: string;
  setErrorText?: React.Dispatch<SetStateAction<string>>;
}

export default function TextInput(props: TextInputProps) {
  function handleOnChange(evt: React.ChangeEvent<HTMLInputElement>) {
    if (props.setErrorText) {
      props.setErrorText('');
    }
    props.setStateFn(evt.target.value);
  }

  return (
    <div className={styles.textInputContainer}>
      <input
        className={styles.textInput}
        type='text'
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
