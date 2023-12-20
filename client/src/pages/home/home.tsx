import { Link, useNavigate } from 'react-router-dom';
import styles from './home.module.css';
import { useState } from 'react';
import { login } from '../../services/user-api';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const data = await login(email, password);

    console.log(data);
    navigate('/dashboard');
  }

  return (
    <div>
      <h2>WELCOME TO THE HOME PAGE ENJOY YOUR STAY</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor='email'>Email</label>
          <input
            type='text'
            id={'email'}
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
          />
        </div>
        <div>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id={'password'}
            value={password}
            onChange={(evt) => setPassword(evt.target.value)}
          />
        </div>
        <button>Login</button>
      </form>
      <Link to={'/dashboard'} className={styles.link}>
        Dashboard
      </Link>
    </div>
  );
}
