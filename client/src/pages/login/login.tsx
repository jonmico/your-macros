import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button/button.styled';
import Spinner from '../../components/spinner/spinner';
import useUser from '../../hooks/useUser';
import styles from './login.module.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loginError, setLoginError] = useState('');
  const { login, userState } = useUser();
  const navigate = useNavigate();

  // Navigate to /dashboard if user is authenticated.
  useEffect(() => {
    if (userState.isAuthenticated) {
      navigate('/dashboard');
    }
  }, [userState.isAuthenticated, navigate]);

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

    const data = await login(email, password);

    console.log(data);
    if (userState.isAuthenticated) {
      // login(email, password);
      console.log(userState);
      // navigate('/dashboard');
    } else {
      setLoginError('Email or password is incorrect.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.loginForm}>
      {userState.isLoading && (
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
