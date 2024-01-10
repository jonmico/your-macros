import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../components/button/button.styled';
import styles from './login.module.css';
import { login } from '../../services/user-api';
import { useNavigate } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import { ILoginData } from '../../types/login-data';
import Spinner from '../../components/spinner/spinner';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const {
    setUser,
    setIsAuthenticated,
    setYourFoods,
    isAuthenticated,
    setLogs,
    setSelectedLog,
  } = useUser();
  const navigate = useNavigate();

  // Navigate to /dashboard if user is authenticated.
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setLoginError('');

    if (!email) {
      setEmailError('Email required.');
    }

    if (!password) {
      setPasswordError('Password required.');
    }

    if (!email || !password) {
      return;
    }

    setIsLoading(true);
    const data: ILoginData = await login(email, password);
    setIsLoading(false);

    console.log(data);
    if (data.isAuthenticated) {
      setUser(data.user);
      setLogs(data.user.logs);
      setYourFoods(data.user.yourFoods);
      setSelectedLog(data.user.logs[data.user.logs.length - 1]);
      setIsAuthenticated(true);
      navigate('/dashboard');
    } else {
      setLoginError('Email or password is incorrect.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      {isLoading && (
        <div className={styles.loginFormCover}>
          <Spinner />
        </div>
      )}
      <h2 className={styles.loginHeader}>Login</h2>
      <div className={styles.loginFormFieldContainer}>
        {loginError && <div className={styles.loginError}>{loginError}</div>}
        <div className={styles.loginFormField}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            onChange={(evt) => {
              setEmailError('');
              setEmail(evt.target.value);
            }}
            value={email}
          />
          {emailError && <div className={styles.error}>{emailError}</div>}
        </div>
        <div className={styles.loginFormField}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            onChange={(evt) => {
              setPasswordError('');
              setPassword(evt.target.value);
            }}
            value={password}
          />
          {passwordError && <div className={styles.error}>{passwordError}</div>}
        </div>
        <PrimaryButton>Login</PrimaryButton>
      </div>
    </form>
  );
}
