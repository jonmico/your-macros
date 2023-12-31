import styled from 'styled-components';

export const StyledMealBuilder = styled.div`
  border: 1px solid var(--color-gray-700);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const StartText = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 1.25rem;
  padding: 1rem;
`;

export const MealNameInput = styled.input`
  background-color: var(--color-zinc-900);
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-gray-700);
  color: var(--color-slate-500);
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.25rem 0;
  width: 30%;
  max-width: 18rem;
  min-width: 11rem;
  outline: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    padding 0.3s ease-in-out;

  &:active,
  &:focus {
    background-color: var(--color-slate-800);
    outline: var(--color-slate-800);
    color: var(--color-slate-300);
    padding: 0.25rem 0.5rem;
  }
`;

export const DataButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MealNameError = styled.p`
  color: var(--color-red-400);
  font-size: 1rem;
`;

export const MealNameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const MealListContainer = styled.div`
  border: 1px solid var(--color-gray-700);
  border-radius: 10px;
`;
