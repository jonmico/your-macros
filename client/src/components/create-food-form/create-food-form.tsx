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
import { createFood } from '../../services/food-api';

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

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
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

    if (!brand) setBrandError('Required field.');
    if (!name) setNameError('Required field.');

    if (servingSize === '') setServingSizeError('Required field.');
    if (Number(servingSize) < 0)
      setServingSizeError('Value must be 0 or greater.');

    if (carbs === '') setCarbsError('Required field.');
    if (Number(carbs) < 0) setCarbsError('Value must be 0 or greater.');

    if (fat === '') setFatError('Required field.');
    if (Number(fat) < 0) setFatError('Value must be 0 or greater.');

    if (protein === '') setProteinError('Required field.');
    if (Number(protein) < 0) setProteinError('Value must be 0 or greater.');

    console.log(servingSize);

    const data = await createFood(newFood);

    resetForm();

    console.log(data);
  }

  function handleReset() {
    resetForm();
  }

  function resetForm() {
    setBrand('');
    setBrandError('');
    setName('');
    setNameError('');
    setServingSize('');
    setServingSizeError('');
    setCarbs('');
    setCarbsError('');
    setFat('');
    setFatError('');
    setProtein('');
    setProteinError('');
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow>
        <FormLabel htmlFor='brand'>Brand</FormLabel>
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
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='name'>Name</FormLabel>
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
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='servingSize'>Serving Size</FormLabel>
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
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='carbs'>Carbs</FormLabel>
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
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='fat'>Fat</FormLabel>
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
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='protein'>Protein</FormLabel>
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
