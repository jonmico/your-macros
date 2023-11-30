import { useState } from 'react';
import { PrimaryButton, ResetButton } from '../button/button.styled';
import {
  ButtonContainer,
  FormRow,
  FormInput,
  FormLabel,
  StyledForm,
  FormError,
  InputErrorContainer,
} from './create-food-form.styled';
import { IFood } from '../../types/food';
import { createFood } from '../../services/food-api';

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
      <FormRow>
        <FormLabel htmlFor='brand'>Brand</FormLabel>
        <InputErrorContainer>
          <FormInput
            id={'brand'}
            type='text'
            value={brand}
            onChange={(evt) => {
              setBrandError('');
              setBrand(evt.target.value);
            }}
          />
          {brandError && <FormError>{brandError}</FormError>}
        </InputErrorContainer>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <InputErrorContainer>
          <FormInput
            id={'name'}
            type='text'
            value={name}
            onChange={(evt) => {
              setNameError('');
              setName(evt.target.value);
            }}
          />
          {nameError && <FormError>{nameError}</FormError>}
        </InputErrorContainer>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='servingSize'>Serving Size</FormLabel>
        <InputErrorContainer>
          <FormInput
            id={'servingSize'}
            type='number'
            value={servingSize}
            onChange={(evt) => {
              setServingSizeError('');
              setServingSize(evt.target.value);
            }}
          />
          {servingSizeError && <FormError>{servingSizeError}</FormError>}
        </InputErrorContainer>
      </FormRow>

      <FormRow>
        <FormLabel htmlFor='carbs'>Carbs</FormLabel>
        <InputErrorContainer>
          <FormInput
            id={'carbs'}
            type='number'
            value={carbs}
            onChange={(evt) => {
              setCarbsError('');
              setCarbs(evt.target.value);
            }}
          />
          {carbsError && <FormError>{carbsError}</FormError>}
        </InputErrorContainer>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='fat'>Fat</FormLabel>
        <InputErrorContainer>
          <FormInput
            id={'fat'}
            type='number'
            value={fat}
            onChange={(evt) => {
              setFatError('');
              setFat(evt.target.value);
            }}
          />
          {fatError && <FormError>{fatError}</FormError>}
        </InputErrorContainer>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='protein'>Protein</FormLabel>
        <InputErrorContainer>
          <FormInput
            id={'protein'}
            type='number'
            value={protein}
            onChange={(evt) => {
              setProteinError('');
              setProtein(evt.target.value);
            }}
          />
          {proteinError && <FormError>{proteinError}</FormError>}
        </InputErrorContainer>
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
