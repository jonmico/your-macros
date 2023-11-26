import styled from 'styled-components';

export const PrimaryButton = styled.button`
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  padding: 0.75rem 1.75rem;
  background-color: var(--secondary);
  color: var(--text);
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

export const SecondaryButton = styled(PrimaryButton)`
  background-color: var(--text);
  color: var(--secondary);

  &:hover {
    background-color: var(--secondary);
    color: var(--white);
  }

  &:active {
    background-color: var(--accent);
  }
`;
