import styled from 'styled-components';

export const Button = styled.button`
  border: none;
  border-radius: 8px;
  background-color: var(--secondary);
  color: var(--text);
  font-size: 1.15rem;
  padding: 0.75rem 1.75rem;
  cursor: pointer;

  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--accent);
    color: var(--background);
  }

  &:active {
    background-color: var(--secondary);
  }

  &:focus {
    outline: none;
  }
`;
