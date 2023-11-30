import styled from 'styled-components';

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.25rem;
  padding-top: 1rem;
`;

export const FormRow = styled.div`
  display: flex;
  gap: 1.25rem;
  align-items: center;
`;

export const FormLabel = styled.label`
  min-width: 135px;
  font-size: 1.1rem;
  color: var(--text);
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
  justify-content: center;
  padding-top: 0.5rem;
  gap: 2rem;
`;
