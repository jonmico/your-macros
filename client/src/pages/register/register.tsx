import { useState } from 'react';
import { PrimaryButton } from '../../components/button/button.styled';
import styles from './register.module.css';
import { register } from '../../services/user-api';
import useUser from '../../hooks/useUser';
import { IUser } from '../../types/user';
import { useNavigate } from 'react-router-dom';

interface IRegisterData {
  isAuthenticated: boolean;
  successfulRegister: boolean;
  user: IUser;
}

// TODO: Add in multi page signup. Page 1 is email/password, page 2 would be macro config for user profile.
export default function Register() {
  const { setUser, setIsAuthenticated } = useUser();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2, setPassword2] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setPasswordMatchError('');

    if (!email) setEmailError('Required field');
    if (!password) setPasswordError('Required field');
    if (!password2) setPassword2Error('Required field');

    if (!email || !password || !password2) return;

    if (password !== password2) {
      setPasswordMatchError('Passwords do not match.');
      return;
    }

    const data: IRegisterData = await register(email, password);

    console.log(data);

    if (data.successfulRegister) {
      setUser(data.user);
      setIsAuthenticated(data.isAuthenticated);
      navigate('/dashboard');
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <h2 className={styles.registerHeader}>Sign Up</h2>
      <div className={styles.registerFormFieldContainer}>
        <EmailPasswordFormPage
          email={email}
          emailError={emailError}
          password={password}
          passwordError={passwordError}
          password2={password2}
          password2Error={password2Error}
          passwordMatchError={passwordMatchError}
          setEmail={setEmail}
          setEmailError={setEmailError}
          setPassword={setPassword}
          setPasswordError={setPasswordError}
          setPassword2={setPassword2}
          setPassword2Error={setPassword2Error}
        />
        <PrimaryButton>Sign up</PrimaryButton>
      </div>
    </form>
  );
}

interface EmailPasswordFormPageProps {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  password2: string;
  password2Error: string;
  passwordMatchError: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setEmailError: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setPasswordError: React.Dispatch<React.SetStateAction<string>>;
  setPassword2: React.Dispatch<React.SetStateAction<string>>;
  setPassword2Error: React.Dispatch<React.SetStateAction<string>>;
}

function EmailPasswordFormPage(props: EmailPasswordFormPageProps) {
  const {
    email,
    emailError,
    password,
    passwordError,
    password2,
    password2Error,
    passwordMatchError,
    setEmail,
    setEmailError,
    setPassword,
    setPasswordError,
    setPassword2,
    setPassword2Error,
  } = props;
  return (
    <>
      <div className={styles.registerFormField}>
        <label htmlFor='email'>Email</label>
        <input
          type='text'
          name='email'
          id='email'
          value={email}
          onChange={(evt) => {
            setEmailError('');
            setEmail(evt.target.value);
          }}
        />
        {emailError && <div className={styles.error}>{emailError}</div>}
      </div>
      <div className={styles.registerFormField}>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(evt) => {
            setPasswordError('');
            setPassword(evt.target.value);
          }}
        />
        {passwordError && <div className={styles.error}>{passwordError}</div>}
      </div>
      <div className={styles.registerFormField}>
        <label htmlFor='password2'>Re-enter Password</label>
        <input
          type='password'
          name='password2'
          id='password2'
          value={password2}
          onChange={(evt) => {
            setPassword2Error('');
            setPassword2(evt.target.value);
          }}
        />
        {password2Error && <div className={styles.error}>{password2Error}</div>}
      </div>
      {passwordMatchError && (
        <div className={`${styles.error} ${styles.matchError}`}>
          {passwordMatchError}
        </div>
      )}
    </>
  );
}

function UserMacroConfigFormPage() {
  return <div></div>;
}
