import { useState } from 'react';
import { createFood } from '../../services/food-api';
import { IFood } from '../../types/food';
import { PrimaryButton, ResetButton } from '../button/button.styled';
import Input from '../input/input';
import Spinner from '../spinner/spinner';
import styles from './create-food-form.module.css';
import {
  ButtonContainer,
  FormLabel,
  FormRow,
  StyledForm,
} from './create-food-form.styled';

export default function CreateFoodForm() {
  const [isLoading, setIsLoading] = useState(false);

  const [brand, setBrand] = useState('');
  const [brandError, setBrandError] = useState('');

  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [servingSize, setServingSize] = useState('');
  const [servingSizeError, setServingSizeError] = useState('');

  const [carbs, setCarbs] = useState('');
  const [carbsError, setCarbsError] = useState('');

  const [fat, setFat] = useState('');
  const [fatError, setFatError] = useState('');

  const [protein, setProtein] = useState('');
  const [proteinError, setProteinError] = useState('');

  // TODO: Look into this validation.
  // There has to be a better way to validate these inputs.
  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    let isError = false;

    const newFood: IFood = {
      brand,
      name,
      servingSize: Number(servingSize),
      calories: Number(carbs) * 4 + Number(protein) * 4 + Number(fat) * 9,
      macros: {
        carbs: Number(carbs),
        fat: Number(fat),
        protein: Number(protein),
      },
    };

    if (!brand) {
      isError = true;
      setBrandError('Required field.');
    }
    if (!name) {
      isError = true;
      setNameError('Required field.');
    }

    if (servingSize === '') {
      isError = true;
      setServingSizeError('Required field.');
    }
    if (Number(servingSize) < 0) {
      isError = true;
      setServingSizeError('Value must be 0 or greater.');
    }

    if (carbs === '') {
      isError = true;
      setCarbsError('Required field.');
    }
    if (Number(carbs) < 0) {
      isError = true;
      setCarbsError('Value must be 0 or greater.');
    }

    if (fat === '') {
      isError = true;
      setFatError('Required field.');
    }
    if (Number(fat) < 0) {
      isError = true;
      setFatError('Value must be 0 or greater.');
    }

    if (protein === '') {
      isError = true;
      setProteinError('Required field.');
    }
    if (Number(protein) < 0) {
      isError = true;
      setProteinError('Value must be 0 or greater.');
    }

    if (!isError) {
      setIsLoading(true);
      const data = await createFood(newFood);
      setIsLoading(false);

      resetForm();
      clearErrors();
      console.log(data);
    }
  }

  function handleReset() {
    resetForm();
    clearErrors();
  }

  function resetForm() {
    setBrand('');
    setName('');
    setServingSize('');
    setCarbs('');
    setFat('');
    setProtein('');
  }

  function clearErrors() {
    setBrandError('');
    setNameError('');
    setServingSizeError('');
    setCarbsError('');
    setFatError('');
    setProteinError('');
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      {isLoading && (
        <div className={styles.formCover}>
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        </div>
      )}

      <FormRow>
        <FormLabel htmlFor='brand'>Brand</FormLabel>

        <div className={styles.inputContainer}>
          <Input
            type={'text'}
            name={'brand'}
            id={'brand'}
            stateVal={brand}
            setStateFn={setBrand}
            errorText={brandError}
            setErrorText={setBrandError}
          />
        </div>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <div className={styles.inputContainer}>
          <Input
            type={'text'}
            name={'name'}
            id={'name'}
            stateVal={name}
            setStateFn={setName}
            errorText={nameError}
            setErrorText={setNameError}
          />
        </div>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='servingSize'>Serving Size (g)</FormLabel>
        <div className={styles.inputContainer}>
          <Input
            type={'number'}
            name={'servingSize'}
            id={'servingSize'}
            stateVal={servingSize}
            setStateFn={setServingSize}
            errorText={servingSizeError}
            setErrorText={setServingSizeError}
          />
        </div>
      </FormRow>

      <FormRow>
        <FormLabel htmlFor='carbs'>Carbs (g)</FormLabel>
        <div className={styles.inputContainer}>
          <Input
            type={'number'}
            name={'carbs'}
            id={'carbs'}
            stateVal={carbs}
            setStateFn={setCarbs}
            errorText={carbsError}
            setErrorText={setCarbsError}
          />
        </div>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='fat'>Fat (g)</FormLabel>
        <div className={styles.inputContainer}>
          <Input
            type={'number'}
            name={'fat'}
            id={'fat'}
            stateVal={fat}
            setStateFn={setFat}
            errorText={fatError}
            setErrorText={setFatError}
          />
        </div>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='protein'>Protein (g)</FormLabel>
        <div className={styles.inputContainer}>
          <Input
            type={'number'}
            name={'protein'}
            id={'protein'}
            stateVal={protein}
            setStateFn={setProtein}
            errorText={proteinError}
            setErrorText={setProteinError}
          />
        </div>
      </FormRow>
      <ButtonContainer>
        <PrimaryButton disabled={isLoading} type={'submit'}>
          Submit
        </PrimaryButton>
        <ResetButton disabled={isLoading} type={'reset'} onClick={handleReset}>
          Reset
        </ResetButton>
      </ButtonContainer>
    </StyledForm>
  );
}
