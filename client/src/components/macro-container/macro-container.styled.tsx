import styled from 'styled-components';

export const MealMacro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const CalorieContainer = styled(MealMacro)`
  color: var(--color-red-400);
`;

export const FatContainer = styled(MealMacro)`
  color: var(--color-yellow-400);
`;

export const CarbsContainer = styled(MealMacro)`
  color: var(--color-green-400);
`;

export const ProteinContainer = styled(MealMacro)`
  color: var(--color-blue-400);
`;
