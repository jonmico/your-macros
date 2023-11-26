import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledNavLink = styled(NavLink)`
  padding: 1rem 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  border: 2px solid var(--secondary);
  border-radius: 10px;
  text-decoration: none;
  color: var(--accent);
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out;

  &.active {
    background-color: var(--secondary);
    outline: none;
  }

  &:hover {
    background-color: var(--accent);
    color: var(--background);
  }

  &:active {
    outline: none;
  }
`;
