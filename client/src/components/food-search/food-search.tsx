import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

import {
  Form,
  SearchContainer,
  SearchInput,
  SpinnerContainer,
  StyledFoodSearch,
} from './food-search.styled';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import FoodSearchList from '../food-search-list/food-search-list';
import FoodSearchListItem from '../food-search-list-item/food-search-list-item';
import { useFoods } from '../../hooks/useFoods';
import Spinner from '../spinner/spinner';

interface IData {
  foods?: IFood[];
  message?: string;
}

export default function FoodSearch() {
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoodsError, setSearchedFoodsError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { clearSelectedFood, selectedFood } = useFoods();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    if (!searchInput) {
      if (searchedFoods.length) setSearchedFoods([]);
      if (selectedFood) clearSelectedFood();
      return;
    }

    setIsLoading(true);
    const data: IData = await getFoodByText(searchInput);
    clearSelectedFood();
    setIsLoading(false);

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
            placeholder={'Search for foods'}
            type='text'
            value={searchInput}
            onChange={(evt) => {
              setSearchInput(evt.target.value);
              setSearchedFoodsError('');
            }}
          />
        </SearchContainer>
      </Form>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {searchedFoods?.length > 0 && (
        <FoodSearchList>
          {searchedFoods?.map((food) => (
            <FoodSearchListItem key={food._id} food={food} />
          ))}
        </FoodSearchList>
      )}
      {searchedFoodsError && <p>{searchedFoodsError}</p>}
    </StyledFoodSearch>
  );
}
