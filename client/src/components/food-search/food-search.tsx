import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  Form,
  SearchContainer,
  SearchInput,
  StyledFoodSearch,
} from './food-search.styled';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import FoodSearchList from '../food-search-list/food-search-list';

interface IData {
  foods: IFood[];
}

export default function FoodSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data: IData = await getFoodByText(searchInput);
    console.log(data.foods);
    setSearchedFoods(data.foods);
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
      <FoodSearchList>
        {searchedFoods?.map((food) => (
          <li key={food._id}>{food.name}</li>
        ))}
      </FoodSearchList>
    </StyledFoodSearch>
  );
}
