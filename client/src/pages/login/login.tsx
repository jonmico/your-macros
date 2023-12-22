import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/button/button.styled';
import styles from './login.module.css';
import { login } from '../../services/user-api';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { ILoginData } from '../../types/login-data';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();
  const { user } = useUser();

  // Might not need this if we remove login and signup while a user is logged in.
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const data: ILoginData = await login(email, password);
    console.log(data);
    if (data.isAuthenticated) {
      setUser(data.user);
      navigate('/dashboard');
    } else {
      return;
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
