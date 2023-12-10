import styled from 'styled-components';

export const StyledFoodInfo = styled.div`
  border: 1px solid var(--color-gray-700);
  padding: 1rem;
  border-radius: 10px;
  flex: 1;
`;

export const FoodInfoContainer = styled.div``;

export const BrandAndName = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Brand = styled.span`
  color: var(--color-slate-400);
  font-weight: 500;
`;

export const CalorieAndServingSize = styled.div`
  display: flex;
  gap: 3rem;
`;

export const NoSelectedFoodContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
