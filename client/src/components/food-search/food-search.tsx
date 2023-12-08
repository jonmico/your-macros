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

interface FoodSearchProps {
  setSearchedFoods: React.Dispatch<React.SetStateAction<IFood[]>>;
  searchedFoods: IFood[];
  searchedFoodsError: string;
  setSearchedFoodsError: React.Dispatch<React.SetStateAction<string>>;
}

export default function FoodSearch(props: FoodSearchProps) {
  const {
    searchedFoods,
    setSearchedFoods,
    searchedFoodsError,
    setSearchedFoodsError,
  } = props;
  const [searchInput, setSearchInput] = useState('');

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
    } else if (data.message) {
      console.log(data.message);
      setSearchedFoods([]);
      setSearchedFoodsError(data.message);
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
            onChange={(evt) => {
              setSearchInput(evt.target.value);
              setSearchedFoodsError('');
            }}
          />
        </SearchContainer>
      </Form>
      {searchedFoods?.length ? (
        <FoodSearchList>
          {searchedFoods?.map((food) => (
            <FoodSearchListItem key={food._id} food={food} />
          ))}
        </FoodSearchList>
      ) : searchedFoodsError ? (
        <p>{searchedFoodsError}</p>
      ) : (
        <p>Search for foods.</p>
      )}
    </StyledFoodSearch>
  );
}
