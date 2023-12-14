import styled from 'styled-components';

export const Input = styled.input`
  background-color: var(--color-zinc-900);
  border: 1px solid transparent;
  border-bottom: 1px solid var(--color-slate-700);
  color: var(--color-slate-300);
  font-size: 1rem;
  font-weight: 500;
  width: 4rem;
  height: 2rem;
  text-align: center;
  outline: none;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    padding 0.3s ease-in-out;

  &:active,
  &:focus {
    background-color: var(--color-slate-800);
    outline: var(--color-slate-800);
  }
`;

export const EditInput = styled(Input)`
  width: 2.5rem;
  height: 1.75rem;
`;
