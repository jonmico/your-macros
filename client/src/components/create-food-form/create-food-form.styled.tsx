import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  /* grid-template-columns: 0.5fr 1fr 1.5fr; */
  gap: 1.5rem;
  align-items: center;
`;

export const FormLabel = styled.label`
  min-width: 135px;
  font-size: 1.1rem;
  color: var(--text);
`;

export const InputErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const FormInput = styled.input`
  height: 2.25rem;
  min-width: 13rem;
  padding: 0.25rem 0.5rem;

  border-radius: 5px;
  border: 1px solid var(--accent);

  background-color: var(--secondary);
  color: var(--text);

  font-size: 1rem;

  transition: outline 0.25s ease-in-out, background-color 0.25s ease-in-out,
    color 0.25s ease-in-out;

  &:active,
  &:focus {
    outline: 1px solid var(--primary);
    background-color: var(--accent);
    color: var(--secondary);
  }
`;

export const FormError = styled.p`
  color: var(--color-red-400);
  font-size: 0.85rem;
`;

export const ButtonContainer = styled.div`
  display: flex;
  padding-top: 0.5rem;
  gap: 2rem;
`;
