import styled from 'styled-components';

export const StyledFoodInfo = styled.div`
  border: 1px solid var(--color-gray-700);
  padding: 1rem;
  border-radius: 10px;
  flex: 1;
  max-height: 20rem;
`;

export const FoodInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  /* gap: 1.5rem; */
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

export const MacroFoodInfoRow = styled(FoodInfoRow)`
  padding: 0 1rem;
`;

export const MacroContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NoSelectedFoodContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
