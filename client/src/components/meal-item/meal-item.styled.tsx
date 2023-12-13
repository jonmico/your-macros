import styled from 'styled-components';

export const StyledMealItem = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 2fr 0.5fr;
  text-align: center;
  padding: 1rem 0.5rem;

  & svg {
    width: 1.35rem;
    height: 1.35rem;

    &:hover {
      color: var(--color-red-400);
      cursor: pointer;
    }

    &:active {
      color: var(--color-red-500);
    }
  }
`;

export const SvgContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const CaloriesAndMacrosContainer = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`;

export const MacrosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
