import { useState } from 'react';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import SearchBar from '../search-bar/search-bar';
import styles from './your-food-form.module.css';
import { useFoods } from '../../hooks/useFoods';
import Spinner from '../spinner/spinner';

export default function YourFoodForm() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [searchedFoodsError, setSearchedFoodsError] = useState('');
  const [isFetching, setIsFetching] = useState(false);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    setSearchedFoodsError('');
    if (!searchInput) return;

    setSearchedFoods([]);

    setIsFetching(true);
    const data = await getFoodByText(searchInput);
    setIsFetching(false);

    if (!data.foods) {
      setSearchedFoodsError(data.message);
      return;
    }

    setSearchedFoods([...data.foods]);

    console.log(data);
  }

  return (
    <div className={styles.yourFoodFormContainer}>
      <div className={styles.searchContainer}>
        {isFetching && (
          <div className={styles.spinnerContainer}>
            <Spinner />
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <SearchBar
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
        </form>
        {!searchedFoods.length && !searchedFoodsError ? (
          <Error />
        ) : (
          <SearchedFoodList
            searchedFoods={searchedFoods}
            searchedFoodsError={searchedFoodsError}
          />
        )}
      </div>
    </div>
  );
}

function Error(props: { searchedFoodsError?: string }) {
  return (
    <div className={styles.noSearchedFoodsContainer}>
      {props.searchedFoodsError ? (
        <div>{props.searchedFoodsError}</div>
      ) : (
        <div>Nothing to show here!</div>
      )}
    </div>
  );
}

function SearchedFoodList(props: {
  searchedFoods: IFood[];
  searchedFoodsError: string;
}) {
  const { handleSelectFood } = useFoods();

  if (props.searchedFoodsError)
    return <Error searchedFoodsError={props.searchedFoodsError} />;

  return (
    <ul className={styles.searchedFoodsList}>
      {props.searchedFoods.map((food) => (
        <SearchedFoodListItem
          key={food._id}
          food={food}
          handleSelectFood={handleSelectFood}
        />
      ))}
    </ul>
  );
}

function SearchedFoodListItem(props: {
  food: IFood;
  handleSelectFood: (food: IFood) => void;
}) {
  return (
    <li
      onClick={() => props.handleSelectFood(props.food)}
      className={styles.searchedFoodListItem}
    >
      {props.food.name}
    </li>
  );
}
