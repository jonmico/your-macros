import { useState } from 'react';
import { FoodProvider } from '../../contexts/food-context';
import SearchBar from '../search-bar/search-bar';
import styles from './your-food-form.module.css';

export default function YourFoodForm() {
  const [searchInput, setSearchInput] = useState('');
  return (
    <div className={styles.searchContainer}>
      <FoodProvider>
        <SearchBar setSearchInput={setSearchInput} searchInput={searchInput} />
      </FoodProvider>
    </div>
  );
}
