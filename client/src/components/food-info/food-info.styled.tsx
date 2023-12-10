import styled from 'styled-components';

export const StyledFoodInfo = styled.div`
  border: 1px solid var(--color-gray-700);
  padding: 1rem;
  border-radius: 10px;
  flex: 1;
`;

export const FoodInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

export const BrandAndName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

export const Brand = styled.span`
  color: var(--color-slate-400);
  font-weight: 500;
`;

export const FoodInfoRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const NoSelectedFoodContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
