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
  flex: 1.25;
`;

export const Form = styled.form`
  width: 100%;
`;

export const SpinnerContainer = styled.div`
  display: flex;
  height: 100%;
  padding-top: 3rem;
  justify-content: center;
`;
