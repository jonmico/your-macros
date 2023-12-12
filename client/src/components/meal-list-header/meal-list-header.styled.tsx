import styled from 'styled-components';

export const StyledMealListHeader = styled.div`
  background-color: var(--color-blue-800);
  border-bottom: 1px solid var(--color-slate-700);
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

export const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  text-align: center;
  padding: 0.5rem 0.5rem 0.25rem 0.5rem;
`;
