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
import FoodSearchListItem from '../food-search-list-item/food-search-list-item';

interface IData {
  foods?: IFood[];
  message?: string;
}

export default function FoodSearch() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!searchInput) {
      if (searchedFoods.length) setSearchedFoods([]);
      return;
    }

    const data: IData = await getFoodByText(searchInput);

    if (data.foods) {
      setSearchedFoods(data.foods);
      console.log(data.foods);
    } else {
      console.log(data.message);
    }
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
      {searchedFoods?.length ? (
        <FoodSearchList>
          {searchedFoods?.map((food) => (
            <FoodSearchListItem key={food._id} food={food} />
          ))}
        </FoodSearchList>
      ) : (
        <p>Search for foods.</p>
      )}
    </StyledFoodSearch>
  );
}
