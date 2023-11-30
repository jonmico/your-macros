import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { FaHouseChimney } from 'react-icons/fa6';

export const StyledNavLink = styled(NavLink)`
  padding: 1rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 1px solid var(--color-gray-700);
  border-radius: 10px;
  text-decoration: none;
  color: var(--color-slate-300);
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &.active {
    background-color: var(--color-blue-500);
    color: var(--color-zinc-900);
    outline: none;
  }

  &:hover {
    background-color: var(--color-blue-600);
  }

  &:active {
    outline: none;
  }
`;

export const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  list-style-type: none;
  gap: 1rem;
`;

export const StyledNav = styled.nav`
  width: 12rem;
  flex-shrink: 0;

  & svg {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

export const StyledFaHouseChimney = styled(FaHouseChimney)`
  width: 1.5rem;
  height: 1.5rem;
`;
