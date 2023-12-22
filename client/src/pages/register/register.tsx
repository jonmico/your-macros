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

export default function Register() {
  const { setUser } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data: IRegisterData = await register(email, password);

    console.log(data);

    if (data.successfulRegister) {
      setUser(data.user);
      navigate('/dashboard');
    }
  }

  // TODO: Add in error handling/form feedback.
  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <h2 className={styles.registerHeader}>Sign Up</h2>
      <div className={styles.registerFormFieldContainer}>
        <div className={styles.registerFormField}>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            name='email'
            id='email'
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div className={styles.registerFormField}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            name='password'
            id='password'
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <div className={styles.registerFormField}>
          <label htmlFor='password2'>Re-enter Password</label>
          <input
            type='password'
            name='password2'
            id='password2'
            value={password2}
            onChange={(evt) => setPassword2(evt.target.value)}
          />
        </div>
        <PrimaryButton>Sign up</PrimaryButton>
      </div>
    </form>
  );
}
