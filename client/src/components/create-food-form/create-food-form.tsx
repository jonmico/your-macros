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

export default function CreateFoodForm() {
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const [servingSize, setServingSize] = useState('');
  const [servingSizeError, setServingSizeError] = useState('');

  function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    console.log('Form submitted!');
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <FormRow>
        <FormLabel htmlFor='brand'>Brand</FormLabel>
        <FormInput id={'brand'} type='text' />
        <FormError>Error!</FormError>
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='name'>Name</FormLabel>
        <FormInput id={'name'} type='text' />
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='servingSize'>Serving Size</FormLabel>
        <FormInput id={'servingSize'} type='number' />
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='carbs'>Carbs</FormLabel>
        <FormInput id={'carbs'} type='number' />
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='fats'>Fats</FormLabel>
        <FormInput id={'fats'} type='number' />
      </FormRow>
      <FormRow>
        <FormLabel htmlFor='protein'>Protein</FormLabel>
        <FormInput id={'protein'} type='number' />
      </FormRow>
      <ButtonContainer>
        <PrimaryButton>Submit</PrimaryButton>
        <SecondaryButton>Clear</SecondaryButton>
      </ButtonContainer>
    </StyledForm>
  );
}
