import { useState } from 'react';
import { PrimaryButton } from '../../components/button/button.styled';
import styles from './login.module.css';
import { login } from '../../services/user-api';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const data = await login(email, password);

    // TODO: Probably not the best way to reroute.
    if (data.isValid) {
      navigate('/dashboard');
    }
  }
  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      <h2 className={styles.loginHeader}>Login</h2>
      <div className={styles.loginFormFieldContainer}>
        <div className={styles.loginFormField}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(evt) => setEmail(evt.target.value)}
            value={email}
          />
        </div>
        <div className={styles.loginFormField}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(evt) => setPassword(evt.target.value)}
            value={password}
          />
        </div>
        <PrimaryButton>Login</PrimaryButton>
      </div>
    </form>
  );
}
