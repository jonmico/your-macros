import styled from 'styled-components';

export const ListItem = styled.li`
  padding: 1rem;
  display: grid;
  grid-template-columns: 2rem 13rem 1fr 1fr;
  grid-template-rows: 1fr;
  align-items: center;
  gap: 1rem;
  transition: background-color 0.2s ease-in-out;

  & svg {
    height: 1.5rem;
    width: 1.5rem;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: var(--color-blue-400);
    }

    &:active {
      transition: none;
      color: var(--color-blue-500);
    }
  }

  &:nth-of-type(odd) {
    background-color: var(--color-gray-800);
  }

  &:hover {
    cursor: pointer;
    background-color: var(--color-gray-700);
  }
`;
