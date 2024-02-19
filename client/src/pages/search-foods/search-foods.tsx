import { useState } from 'react';
import SearchBar from '../../components/search-bar/search-bar';
import styles from './search-foods.module.css';
import { IFood } from '../../types/food';
import { getFoodByText } from '../../services/food-api';
import { FaArrowLeft } from 'react-icons/fa6';

export default function SearchFoods() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  function handleSelectFood(food: IFood) {
    setSelectedFood(food);
  }

  function handleClearSelectedFood() {
    setSelectedFood(null);
  }

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
      {selectedFood ? (
        <SelectedFoodData
          handleClearSelectedFood={handleClearSelectedFood}
          food={selectedFood}
        />
      ) : (
        <div className={styles.searchFoods__formListContainer}>
          <form onSubmit={handleSubmit}>
            <SearchBar
              searchInput={searchInput}
              setSearchInput={setSearchInput}
            />
          </form>
          <SearchedFoodsList
            foodList={searchedFoods}
            handleSelectFood={handleSelectFood}
          />
        </div>
      )}
    </div>
  );
}

interface SearchedFoodsListProps {
  foodList: IFood[];
  handleSelectFood: (food: IFood) => void;
}

function SearchedFoodsList(props: SearchedFoodsListProps) {
  if (!props.foodList.length) return null;

  const foodList = props.foodList.map((searchedFood) => (
    <SearchedFoodsListItem
      key={searchedFood._id}
      handleSelectFood={props.handleSelectFood}
      food={searchedFood}
    />
  ));

  return <ul className={styles.searchFoodsList}>{foodList}</ul>;
}

interface SearchedFoodsListItemProps {
  food: IFood;
  handleSelectFood: (food: IFood) => void;
}

function SearchedFoodsListItem(props: SearchedFoodsListItemProps) {
  return (
    <li
      onClick={() => props.handleSelectFood(props.food)}
      className={styles.searchFoodsList__listItem}
    >
      {props.food.name}
    </li>
  );
}

interface SelectedFoodData {
  food: IFood;
  handleClearSelectedFood: () => void;
}

function SelectedFoodData(props: SelectedFoodData) {
  return (
    <div className={styles.selectedFoodData__container}>
      <button
        onClick={props.handleClearSelectedFood}
        className={styles.selectedFoodData__backButton}
      >
        <FaArrowLeft />
      </button>
      <div>
        <h3>{props.food.name}</h3>
        <h4>{props.food.brand}</h4>
      </div>
      <div>
        <div>Serving Size</div>
        <div>{props.food.servingSize}</div>
      </div>
      <div>
        <div>
          <div>Macros</div>
          <div>
            <div>{props.food.macros.fat}</div>
            <div>{props.food.macros.carbs}</div>
            <div>{props.food.macros.protein}</div>
          </div>
        </div>
        <div>
          <div>Calories</div>
          <div>{props.food.calories}</div>
        </div>
      </div>
    </div>
  );
}
