import { useEditMeals } from '../../hooks/useEditMeals';
import SearchBar from '../search-bar/search-bar';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';

import styles from './edit-meal-search.module.css';

export default function EditMealSearch() {
  const {
    searchInput,
    setSearchInput,
    setSearchedFoodsError,
    searchedFoodsError,
    searchedFoods,
    setSearchedFoods,
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
      <form onSubmit={handleSubmit}>
        <SearchBar
          searchInput={searchInput}
          setSearchInput={setSearchInput}
          setSearchedFoodsError={setSearchedFoodsError}
        />
      </form>
      {searchedFoodsError ? (
        <div className={styles.searchedFoodsError}>{searchedFoodsError}</div>
      ) : (
        <SearchedFoodsList searchedFoods={searchedFoods} />
      )}
    </div>
  );
}

interface SearchedFoodsListProps {
  searchedFoods: IFood[];
}

function SearchedFoodsList(props: SearchedFoodsListProps) {
  if (props.searchedFoods.length === 0) return null;

  return (
    <ul className={styles.searchedFoodsList}>
      {props.searchedFoods.map((f) => (
        <SearchedFoodsListItem key={f._id} food={f} />
      ))}
    </ul>
  );
}

interface SearchedFoodsListItemProps {
  food: IFood;
}

function SearchedFoodsListItem(props: SearchedFoodsListItemProps) {
  return <li className={styles.searchedFoodsListItem}>{props.food.name}</li>;
}
