import React, { useState } from 'react';

import { useFoods } from '../../hooks/useFoods';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import FoodSearchListItem from '../food-search-list-item/food-search-list-item';
import Spinner from '../spinner/spinner';
import { Form, SpinnerContainer, StyledFoodSearch } from './food-search.styled';

import SearchBar from '../search-bar/search-bar';
import styles from './food-search.module.css';

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
        <SearchBar
          setSearchInput={setSearchInput}
          searchInput={searchInput}
          setSearchedFoodsError={setSearchedFoodsError}
        />
      </Form>
      {isLoading && (
        <SpinnerContainer>
          <Spinner />
        </SpinnerContainer>
      )}

      {searchedFoods?.length > 0 && !isLoading && (
        <ul className={styles.foodSearchList}>
          {searchedFoods?.map((food) => (
            <FoodSearchListItem key={food._id} food={food} />
          ))}
        </ul>
      )}
      {searchedFoodsError && <p>{searchedFoodsError}</p>}
    </StyledFoodSearch>
  );
}
