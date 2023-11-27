import { useState } from 'react';
import { PrimaryButton, SecondaryButton } from '../button/button.styled';
import {
  ButtonContainer,
  FormRow,
  FormInput,
  FormLabel,
  StyledForm,
  FormError,
} from './create-food-form.styled';
import { IFood } from '../../types/food';

export default function CreateFoodForm() {
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

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const newFood: IFood = {
      brand,
      name,
      servingSize: Number(servingSize),
      macros: {
        carbs: Number(carbs),
        fat: Number(fat),
        protein: Number(protein),
      },
    };
    console.log({ newFood });
  }

  function handleReset() {
    setBrand('');
    setName('');
    setServingSize('');
    setCarbs('');
    setFat('');
    setProtein('');
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow>
        <FormLabel htmlFor='brand'>Brand</FormLabel>
        <FormInput
          id={'brand'}
          type='text'
          value={brand}
          onChange={(evt) => setBrand(evt.target.value)}
        />
        {brandError && <FormError>Required.</FormError>}
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <FormInput
          id={'name'}
          type='text'
          value={name}
          onChange={(evt) => setName(evt.target.value)}
        />
        {nameError && <FormError>Required.</FormError>}
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='servingSize'>Serving Size</FormLabel>
        <FormInput
          id={'servingSize'}
          type='number'
          value={servingSize}
          onChange={(evt) => setServingSize(evt.target.value)}
        />
        {servingSizeError && <FormError>Required.</FormError>}
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='carbs'>Carbs</FormLabel>
        <FormInput
          id={'carbs'}
          type='number'
          value={carbs}
          onChange={(evt) => setCarbs(evt.target.value)}
        />
        {carbsError && <FormError>Required.</FormError>}
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='fat'>Fat</FormLabel>
        <FormInput
          id={'fat'}
          type='number'
          value={fat}
          onChange={(evt) => setFat(evt.target.value)}
        />
        {fatError && <FormError>Required.</FormError>}
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='protein'>Protein</FormLabel>
        <FormInput
          id={'protein'}
          type='number'
          value={protein}
          onChange={(evt) => setProtein(evt.target.value)}
        />
        {proteinError && <FormError>Required.</FormError>}
      </FormRow>
      <ButtonContainer>
        <PrimaryButton type={'submit'}>Submit</PrimaryButton>
        <SecondaryButton type={'reset'} onClick={handleReset}>
          Reset
        </SecondaryButton>
      </ButtonContainer>
    </StyledForm>
  );
}
