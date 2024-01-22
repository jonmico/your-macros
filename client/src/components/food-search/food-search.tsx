import React, { useState } from 'react';
import { useFoods } from '../../hooks/useFoods';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import FoodSearchListItem from '../food-search-list-item/food-search-list-item';
import SearchBar from '../search-bar/search-bar';
import Spinner from '../spinner/spinner';
import styles from './food-search.module.css';
import { Form } from './food-search.styled';

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
    <div className={styles.foodSearchContainer}>
      <div className={styles.formContainer}>
        <Form onSubmit={handleSubmit}>
          <SearchBar
            setSearchInput={setSearchInput}
            searchInput={searchInput}
            setSearchedFoodsError={setSearchedFoodsError}
          />
        </Form>
      </div>

      {searchedFoodsError ? (
        <div className={styles.searchedFoodsErrorContainer}>
          {searchedFoodsError}
        </div>
      ) : (
        <DatabaseList searchedFoods={searchedFoods} />
      )}

      {isLoading && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
    </div>
  );
}

function DatabaseList(props: { searchedFoods: IFood[] }) {
  if (props.searchedFoods.length === 0) return null;
  return (
    <ul className={styles.foodSearchList}>
      {props.searchedFoods.map((food) => (
        <FoodSearchListItem key={food._id} food={food} />
      ))}
    </ul>
  );
}
