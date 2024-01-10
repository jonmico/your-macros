import React, { useState } from 'react';

import { useFoods } from '../../hooks/useFoods';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import FoodSearchListItem from '../food-search-list-item/food-search-list-item';
import Spinner from '../spinner/spinner';
import { Form, SpinnerContainer } from './food-search.styled';

import SearchBar from '../search-bar/search-bar';
import styles from './food-search.module.css';
import { IYourFood } from '../../types/your-food';
import useUser from '../../hooks/useUser';
import { Link } from 'react-router-dom';

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
  const [isDatabaseListOpen, setIsDatabaseListOpen] = useState(true);
  const [isYourFoodsListOpen, setIsYourFoodsListOpen] = useState(false);
  const { yourFoods } = useUser();

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
      <div className={styles.listsContainer}>
        <SearchTabs
          isDatabaseListOpen={isDatabaseListOpen}
          isYourFoodsListOpen={isYourFoodsListOpen}
          setIsDatabaseListOpen={setIsDatabaseListOpen}
          setIsYourFoodsListOpen={setIsYourFoodsListOpen}
        />
        {isDatabaseListOpen && <DatabaseList />}
        {isYourFoodsListOpen && <YourFoodsList yourFoods={yourFoods} />}
      </div>
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
    </div>
  );
}

function DatabaseList() {
  return <div>Database List</div>;
}

function YourFoodsList(props: { yourFoods: IYourFood[] }) {
  return (
    <ul>
      {props.yourFoods.length === 0 ? (
        <div>
          <div>
            No YourFoods made yet. Head over to the Create Food tab to make
            some.
          </div>
          <div>
            Psst, here's a <Link to={'/create-food/your-food-form'}>link</Link>.
          </div>
        </div>
      ) : (
        <>
          {props.yourFoods.map((yourFood) => (
            <li key={yourFood._id}>{yourFood.name}</li>
          ))}
        </>
      )}
    </ul>
  );
}

interface SearchTabsProps {
  isDatabaseListOpen: boolean;
  setIsDatabaseListOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isYourFoodsListOpen: boolean;
  setIsYourFoodsListOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function SearchTabs(props: SearchTabsProps) {
  const isDatabaseListActive = props.isDatabaseListOpen
    ? styles.activeSearchTab
    : '';

  const isYourFoodsListActive = props.isYourFoodsListOpen
    ? styles.activeSearchTab
    : '';

  function handleDatabaseClick() {
    props.setIsDatabaseListOpen(true);
    props.setIsYourFoodsListOpen(false);
  }

  function handleYourFoodsClick() {
    props.setIsYourFoodsListOpen(true);
    props.setIsDatabaseListOpen(false);
  }
  return (
    <div className={styles.searchTabsContainer}>
      <div className={isDatabaseListActive} onClick={handleDatabaseClick}>
        Search Database
      </div>
      <div className={isYourFoodsListActive} onClick={handleYourFoodsClick}>
        YourFoods
      </div>
    </div>
  );
}
