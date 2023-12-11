import styled from 'styled-components';

export const AddMealUI = styled.div`
  padding-top: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const MealContainer = styled.div`
  border: 1px solid var(--color-slate-700);
  border-radius: 10px;
  padding: 1rem;
`;

export const MealNameInput = styled.input`
  background-color: var(--color-zinc-900);
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-slate-700);
  color: var(--color-slate-300);
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.25rem 0.5rem;
  outline: none;

  &:active,
  &:focus {
    background-color: var(--color-slate-800);
    border: 1px solid var(--color-slate-700);
    border-radius: 8px;
  }
`;

export const SearchInfoRow = styled.div`
  display: flex;
  gap: 1rem;
`;
