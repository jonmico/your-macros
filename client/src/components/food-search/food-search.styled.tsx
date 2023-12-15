import styled from 'styled-components';

export const StyledFoodSearch = styled.div`
  width: 45%;
  border: 1px solid var(--color-gray-700);
  border-radius: 10px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  /* min-height: 20rem; */
  flex: 1.25;
`;

export const Form = styled.form`
  width: 100%;
`;

export const SearchContainer = styled.div`
  position: relative;

  & svg {
    position: absolute;
    width: 1.5rem;
    height: 1.5rem;
    top: 12px;
    left: 12px;
  }
`;

export const SearchInput = styled.input`
  width: 100%;
  height: 3rem;
  padding: 0.25rem 0.75rem 0.25rem 2.75rem;

  border-radius: 20px;
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
