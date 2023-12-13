import styled, { css } from 'styled-components';

export const PrimaryButton = styled.button`
  border: none;
  border-radius: 8px;
  font-size: 1.15rem;
  padding: 0.75rem 1.75rem;
  background-color: var(--color-blue-500);
  color: var(--color-zinc-900);
  cursor: pointer;

  transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover {
    background-color: var(--color-blue-600);
  }

  &:active {
    background-color: var(--color-blue-400);
  }

  &:focus {
    outline: none;
  }
`;

export const ResetButton = styled(PrimaryButton)`
  background-color: var(--color-red-400);
  color: var(--secondary);

  &:hover {
    background-color: var(--color-red-500);
  }

  &:active {
    background-color: var(--color-red-300);
  }
`;

interface AddToMealButtonProps {
  $isInMealComponents: boolean;
}

export const AddToMealButton = styled(PrimaryButton)<AddToMealButtonProps>`
  background-color: ${(props) =>
    props.$isInMealComponents
      ? css`var(--color-slate-500)`
      : css`var(--color-blue-500)`};

  &:hover {
    background-color: ${(props) =>
      props.$isInMealComponents
        ? css`var(--color-slate-600)`
        : css`var(--color-blue-600)`};
  }
`;
