import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PrimaryButton } from '../../components/button/button.styled';
import useUser from '../../hooks/useUser';
import styles from './register.module.css';

export default function Register() {
  const [isMacroConfigOpen, setIsMacroConfigOpen] = useState(false);
  const navigate = useNavigate();

  // State for email/password page
  const { register } = useUser();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [password2, setPassword2] = useState('');
  const [password2Error, setPassword2Error] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');

  // State for macro config page
  const [fat, setFat] = useState('');
  const [fatError, setFatError] = useState('');
  const [carbs, setCarbs] = useState('');
  const [carbsError, setCarbsError] = useState('');
  const [protein, setProtein] = useState('');
  const [proteinError, setProteinError] = useState('');

  const calories = Number(fat) * 9 + Number(carbs) * 4 + Number(protein) * 4;

  function handleNextClick(evt: React.FormEvent<HTMLButtonElement>) {
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

    setIsMacroConfigOpen(true);
  }

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!fat) setFatError('Required field');
    if (!carbs) setCarbsError('Required field');
    if (!protein) setProteinError('Required field');

    if (!fat || !carbs || !protein) return;

    const macros = {
      fat: Number(fat),
      carbs: Number(carbs),
      protein: Number(protein),
    };

    await register(email, password, macros, calories);

    navigate('/dashboard');
  }

  return (
    <form onSubmit={handleSubmit} className={styles.registerForm}>
      <h2 className={styles.registerHeader}>Sign Up</h2>
      <div className={styles.registerFormFieldContainer}>
        {!isMacroConfigOpen ? (
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
            handleNextClick={handleNextClick}
          />
        ) : (
          <>
            <UserMacroConfigFormPage
              fat={fat}
              fatError={fatError}
              carbs={carbs}
              carbsError={carbsError}
              protein={protein}
              proteinError={proteinError}
              setFat={setFat}
              setFatError={setFatError}
              setCarbs={setCarbs}
              setCarbsError={setCarbsError}
              setProtein={setProtein}
              setProteinError={setProteinError}
              calories={calories}
            />
          </>
        )}
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
  handleNextClick: (evt: React.FormEvent<HTMLButtonElement>) => void;
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
    handleNextClick,
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
      <div className={styles.formStageDisplay}>
        <div className={styles.blue}></div>
        <div className={styles.gray}></div>
      </div>
      <PrimaryButton onClick={(evt) => handleNextClick(evt)}>
        Next
      </PrimaryButton>
    </>
  );
}

interface UserMacroConfigFormPageProps {
  fat: string;
  fatError: string;
  carbs: string;
  carbsError: string;
  protein: string;
  proteinError: string;
  calories: number;
  setFat: React.Dispatch<React.SetStateAction<string>>;
  setFatError: React.Dispatch<React.SetStateAction<string>>;
  setCarbs: React.Dispatch<React.SetStateAction<string>>;
  setCarbsError: React.Dispatch<React.SetStateAction<string>>;
  setProtein: React.Dispatch<React.SetStateAction<string>>;
  setProteinError: React.Dispatch<React.SetStateAction<string>>;
}

function UserMacroConfigFormPage(props: UserMacroConfigFormPageProps) {
  return (
    <>
      <h3>Let's set up your account</h3>
      <div className={styles.registerFormField}>
        <label htmlFor='fat'>Fat</label>
        <input
          type='number'
          name={'fat'}
          id={'fat'}
          value={props.fat}
          onChange={(evt) => {
            props.setFatError('');
            props.setFat(evt.target.value);
          }}
        />
        {props.fatError && <div className={styles.error}>{props.fatError}</div>}
      </div>
      <div className={styles.registerFormField}>
        <label htmlFor='Carbs'>Carbs</label>
        <input
          type='number'
          name={'carbs'}
          id={'carbs'}
          value={props.carbs}
          onChange={(evt) => {
            props.setCarbsError('');
            props.setCarbs(evt.target.value);
          }}
        />
        {props.carbsError && (
          <div className={styles.error}>{props.carbsError}</div>
        )}
      </div>
      <div className={styles.registerFormField}>
        <label htmlFor='protein'>Protein</label>
        <input
          type='number'
          name={'protein'}
          id={'protein'}
          value={props.protein}
          onChange={(evt) => {
            props.setProteinError('');
            props.setProtein(evt.target.value);
          }}
        />
        {props.proteinError && (
          <div className={styles.error}>{props.proteinError}</div>
        )}
      </div>
      <div>Calories: {props.calories}</div>
      <div className={styles.formStageDisplay}>
        <div className={styles.gray}></div>
        <div className={styles.blue}></div>
      </div>
      <PrimaryButton>Sign up</PrimaryButton>
    </>
  );
}
