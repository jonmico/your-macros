import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import styles from './search-foods.module.css';
import { IFood } from '../../types/food';
import { getFoodByText } from '../../services/food-api';

export default function SearchFoods() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);

  const foodsList = searchedFoods.map((searchedFood) => (
    <SearchedFoodsListItem key={searchedFood._id} food={searchedFood} />
  ));

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data: { foods: IFood[] } = await getFoodByText(searchInput);
    console.log(data);
    setSearchedFoods(data.foods);
  }
  return (
    <div className={styles.searchFoods__Container}>
      <h2 className={styles.searchFoods__Header}>
        Browse the database for foods
      </h2>
      <div className={styles.searchFoods__formListContainer}>
        <form onSubmit={handleSubmit}>
          <SearchBar
            searchInput={searchInput}
            setSearchInput={setSearchInput}
          />
        </form>
        <ul className={styles.searchFoodsList}>{foodsList}</ul>
      </div>
    </div>
  );
}

function SearchedFoodsListItem(props: { food: IFood }) {
  return (
    <li className={styles.searchFoodsList__listItem}>{props.food.name}</li>
  );
}
