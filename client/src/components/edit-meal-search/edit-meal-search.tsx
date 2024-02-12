import { useEditMeals } from '../../hooks/useEditMeals';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import SearchBar from '../search-bar/search-bar';

import { FaArrowLeft } from 'react-icons/fa6';
import styles from './edit-meal-search.module.css';
import { useState } from 'react';

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
  const [servings, setServings] = useState('1');
  const servingsNum = Number(servings);

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
      <div className={styles.foodInfo__gridContainer}>
        <div className={styles.foodInfo__foodData}>
          <div>
            <h3 className={styles.foodInfo__foodName}>{props.food.name}</h3>
            <h4 className={styles.foodInfo__foodBrand}>{props.food.brand}</h4>
          </div>
          <div className={styles.foodInfo__servingSizeContainer}>
            <div className={styles.foodInfo__servingSizeLabel}>
              Serving Size
            </div>
            <div className={styles.foodInfo__servingSize}>
              {props.food.servingSize}g
            </div>
          </div>
        </div>
        <div className={styles.foodInfo__foodData}>
          <FoodInfoMacros
            servings={servingsNum}
            calories={props.food.calories}
            macros={props.food.macros}
          />
          <form
            className={styles.foodInfo__servingsForm}
            onSubmit={(evt) => evt.preventDefault()}
          >
            <div className={styles.foodInfo__servingsFormField}>
              <label htmlFor='food-info-servings'>Servings</label>
              <input
                className={styles.foodInfo__servingsInput}
                value={servings}
                onChange={(evt) => setServings(evt.target.value)}
                type='number'
                id={'food-info-servings'}
                name={'food-info-servings'}
              />
            </div>
            <button className={styles.foodInfo__servingsFormSubmitButton}>
              Add to meal
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function FoodInfoMacros(props: {
  calories: number;
  macros: { carbs: number; fat: number; protein: number };
  servings: number;
}) {
  return (
    <div className={styles.foodInfoMacros__macros}>
      <div className={styles.foodInfoMacros__calories}>
        {props.calories * props.servings}cals
      </div>
      <div className={styles.foodInfoMacros__fat}>
        {props.macros.fat * props.servings}f
      </div>
      <div className={styles.foodInfoMacros__carbs}>
        {props.macros.carbs * props.servings}c
      </div>
      <div className={styles.foodInfoMacros__protein}>
        {props.macros.protein * props.servings}p
      </div>
    </div>
  );
}
