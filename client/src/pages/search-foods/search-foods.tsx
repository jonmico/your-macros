import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import styles from './search-foods.module.css';
import { IFood } from '../../types/food';
import { getFoodByText } from '../../services/food-api';

export default function SearchFoods() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    const data: { foods: IFood[] } = await getFoodByText(searchInput);
    console.log(data);
    setSearchedFoods(data.foods);
  }
  return (
    <div className={styles.searchFoodsContainer}>
      <h2>Browse the database for foods</h2>
      <form onSubmit={handleSubmit}>
        <SearchBar searchInput={searchInput} setSearchInput={setSearchInput} />
        <ul>
          {searchedFoods.map((searchedFood) => (
            <SearchedFoodsListItem key={searchedFood._id} food={searchedFood} />
          ))}
        </ul>
      </form>
    </div>
  );
}

function SearchedFoodsListItem(props: { food: IFood }) {
  return <li>{props.food.name}</li>;
}
