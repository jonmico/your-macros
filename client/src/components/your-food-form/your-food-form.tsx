import { useState } from 'react';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import SearchBar from '../search-bar/search-bar';
import styles from './your-food-form.module.css';

export default function YourFoodForm() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);

  async function handleSubmit(evt: React.FormEvent<HTMLFormElement>) {
    evt.preventDefault();

    const data = await getFoodByText(searchInput);

    setSearchedFoods([...data.foods]);
    console.log(data);
  }

  return (
    <div className={styles.yourFoodFormContainer}>
      <div className={styles.searchContainer}>
        <form onSubmit={handleSubmit}>
          <SearchBar
            setSearchInput={setSearchInput}
            searchInput={searchInput}
          />
        </form>
        <ul>
          {searchedFoods.map((food) => (
            <li key={food._id}>{food.name}</li>
          ))}
        </ul>
      </div>
      <div>hello?</div>
    </div>
  );
}
