import { FaBook, FaHouseChimney, FaPencil, FaUtensils } from 'react-icons/fa6';
import { StyledList, StyledNav, StyledNavLink } from './navbar.styled';

export default function Navbar() {
  return (
    <StyledNav>
      <StyledList>
        <li>
          <StyledNavLink to={'/dashboard'}>
            <FaHouseChimney />
            <span>Dashboard</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={'/add-meal'}>
            <FaUtensils />
            <span>Add Meal</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={'/logs'}>
            <FaBook />
            <span>Logs</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to={'create-food'}>
            <FaPencil />
            <span>Create Food</span>
          </StyledNavLink>
        </li>
      </StyledList>
    </StyledNav>
  );
}
