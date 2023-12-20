import { PrimaryButton } from '../../components/button/button.styled';
import styles from './login.module.css';

export default function Login() {
  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('hello?');
  }
  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2 className={styles.loginHeader}>Login</h2>
      <div className={styles.loginFormFieldContainer}>
        <div className={styles.loginFormField}>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' />
        </div>
        <div className={styles.loginFormField}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <PrimaryButton>Login</PrimaryButton>
      </div>
    </form>
  );
}
