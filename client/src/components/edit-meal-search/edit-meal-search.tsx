import { useEditMeals } from '../../hooks/useEditMeals';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import SearchBar from '../search-bar/search-bar';

import { FaArrowLeft } from 'react-icons/fa6';
import styles from './edit-meal-search.module.css';

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
      <div className={styles.foodInfo__foodData}>
        <div>
          <h3 className={styles.foodInfo__foodName}>{props.food.name}</h3>
          <h4 className={styles.foodInfo__foodBrand}>{props.food.brand}</h4>
        </div>
        <div className={styles.foodInfo__servingSizeContainer}>
          <div>Serving Size:</div>
          <div>{props.food.servingSize}g</div>
        </div>
        <FoodInfoMacros
          calories={props.food.calories}
          macros={props.food.macros}
        />
      </div>
    </div>
  );
}

function FoodInfoMacros(props: {
  calories: number;
  macros: { carbs: number; fat: number; protein: number };
}) {
  return (
    <div className={styles.foodInfoMacros__macros}>
      <div className={styles.foodInfoMacros__calories}>
        {props.calories}cals
      </div>
      <div className={styles.foodInfoMacros__fat}>{props.macros.fat}f</div>
      <div className={styles.foodInfoMacros__carbs}>{props.macros.carbs}c</div>
      <div className={styles.foodInfoMacros__protein}>
        {props.macros.protein}p
      </div>
    </div>
  );
}
