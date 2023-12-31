import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 35rem;
  gap: 1.25rem;
  padding-top: 1rem;
  position: relative;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

export const FormLabel = styled.label`
  min-width: 8rem;
  font-size: 1.1rem;
`;

export const InputErrorContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FormInput = styled.input`
  height: 2.25rem;
  padding: 0.25rem 0.5rem;

  border-radius: 5px;
  border: 1px solid var(--color-gray-700);
  background-color: var(--color-zinc-900);
  color: var(--color-slate-300);

  font-size: 1rem;
  transition: background-color 0.25s ease-in-out;

  &:active,
  &:focus {
    outline: 1px solid var(--color-blue-500);
    background-color: var(--color-zinc-800);
  }
`;

export const FormError = styled.p`
  color: var(--color-red-400);
  font-size: 0.85rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.5rem;
  gap: 2rem;
`;
