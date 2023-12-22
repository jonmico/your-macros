import { PrimaryButton } from '../../components/button/button.styled';
import styles from './register.module.css';

export default function Register() {
  return (
    <form className={styles.registerForm}>
      <h2 className={styles.registerHeader}>Sign Up</h2>
      <div className={styles.registerFormFieldContainer}>
        <div className={styles.registerFormField}>
          <label htmlFor='email'>Email</label>
          <input type='text' name='email' id='email' />
        </div>
        <div className={styles.registerFormField}>
          <label htmlFor='password'>Password</label>
          <input type='password' name='password' id='password' />
        </div>
        <div className={styles.registerFormField}>
          <label htmlFor='password2'>Re-enter Password</label>
          <input type='password' name='password2' id='password2' />
        </div>
        <PrimaryButton>Sign up</PrimaryButton>
      </div>
    </form>
  );
}
