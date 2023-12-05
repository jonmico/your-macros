import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  Form,
  SearchContainer,
  SearchInput,
  StyledFoodSearch,
} from './food-search.styled';
import { getFoodByText } from '../../services/food-api';

export default function FoodSearch() {
  const [searchInput, setSearchInput] = useState('');

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data = await getFoodByText(searchInput);
    console.log(data);
  }

  return (
    <StyledFoodSearch>
      <Form onSubmit={handleSubmit}>
        <SearchContainer>
          <FaSearch />
          <SearchInput
            type='text'
            value={searchInput}
            onChange={(evt) => setSearchInput(evt.target.value)}
          />
        </SearchContainer>
      </Form>
    </StyledFoodSearch>
  );
}
