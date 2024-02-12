import { useEditMeals } from '../../hooks/useEditMeals';
import SearchBar from '../search-bar/search-bar';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';

import styles from './edit-meal-search.module.css';
import { FaArrowLeft } from 'react-icons/fa6';

export default function EditMealSearch() {
  const {
    searchInput,
    setSearchInput,
    setSearchedFoodsError,
    searchedFoodsError,
    searchedFoods,
    setSearchedFoods,
    selectedFood,
  } = useEditMeals();

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!searchInput) return;

    const data: { message?: string; foods?: IFood[] } = await getFoodByText(
      searchInput
    );

    if (data.message) {
      setSearchedFoodsError(data.message);
      setSearchedFoods([]);
      return;
    }

    if (data.foods) {
      setSearchedFoods(data.foods);
    }
  }

  return (
    <div className={styles.editMealSearchContainer}>
      {selectedFood ? (
        <FoodInfo food={selectedFood} />
      ) : (
        <>
          <form onSubmit={handleSubmit}>
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
              setSearchedFoodsError={setSearchedFoodsError}
            />
          </form>
          {searchedFoodsError ? (
            <div className={styles.searchedFoodsError}>
              {searchedFoodsError}
            </div>
          ) : (
            <SearchedFoodsList searchedFoods={searchedFoods} />
          )}
        </>
      )}
    </div>
  );
}

function SearchedFoodsList(props: { searchedFoods: IFood[] }) {
  if (props.searchedFoods.length === 0) return null;

  return (
    <ul className={styles.searchedFoodsList}>
      {props.searchedFoods.map((f) => (
        <SearchedFoodsListItem key={f._id} food={f} />
      ))}
    </ul>
  );
}

function SearchedFoodsListItem(props: { food: IFood }) {
  const { setSelectedFood } = useEditMeals();

  function handleClick() {
    setSelectedFood(props.food);
  }

  return (
    <li onClick={handleClick} className={styles.searchedFoodsListItem}>
      {props.food.name}
    </li>
  );
}

function FoodInfo(props: { food: IFood }) {
  const { setSelectedFood } = useEditMeals();

  function handleBackClick() {
    setSelectedFood(null);
  }

  return (
    <div className={styles.foodInfo}>
      <button
        className={styles.foodInfo__backArrowButton}
        onClick={handleBackClick}
      >
        <FaArrowLeft />
      </button>
      <div>
        {props.food.name} <button onClick={handleBackClick}>back</button>
      </div>
    </div>
  );
}
