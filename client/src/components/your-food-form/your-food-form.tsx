import { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { getFoodByText } from '../../services/food-api';
import { IFood } from '../../types/food';
import SearchBar from '../search-bar/search-bar';
import Spinner from '../spinner/spinner';
import styles from './your-food-form.module.css';

export default function YourFoodForm() {
  const [searchInput, setSearchInput] = useState('');
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [searchedFoodsError, setSearchedFoodsError] = useState('');
  const [isFetching, setIsFetching] = useState(false);
  const [servings, setServings] = useState('1');
  const [foodComponents, setFoodComponents] = useState<
    {
      food: IFood;
      servings: number;
    }[]
  >([]);

  const { selectedFood } = useFoods();

  function handleSetServings(value: string) {
    setServings(value);
  }

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
        {!selectedFood ? (
          <Search
            isFetching={isFetching}
            handleSubmit={handleSubmit}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            searchedFoods={searchedFoods}
            searchedFoodsError={searchedFoodsError}
          />
        ) : (
          <SelectedFoodPanel
            selectedFood={selectedFood}
            servings={servings}
            handleSetServings={handleSetServings}
            setFoodComponents={setFoodComponents}
          />
        )}
      </div>
      <div>
        {foodComponents.map((food) => (
          <div>{food.food.name}</div>
        ))}
      </div>
    </div>
  );
}

interface SearchProps {
  isFetching: boolean;
  handleSubmit: (evt: React.FormEvent<HTMLFormElement>) => Promise<void>;
  searchInput: string;
  setSearchInput: React.Dispatch<React.SetStateAction<string>>;
  searchedFoods: IFood[];
  searchedFoodsError: string;
}

function Search(props: SearchProps) {
  return (
    <>
      {props.isFetching && (
        <div className={styles.spinnerContainer}>
          <Spinner />
        </div>
      )}
      <form onSubmit={props.handleSubmit}>
        <SearchBar
          setSearchInput={props.setSearchInput}
          searchInput={props.searchInput}
        />
      </form>
      {!props.searchedFoods.length && !props.searchedFoodsError ? (
        <Error />
      ) : (
        <SearchedFoodList
          searchedFoods={props.searchedFoods}
          searchedFoodsError={props.searchedFoodsError}
        />
      )}
    </>
  );
}

function SelectedFoodPanel(props: {
  selectedFood: IFood;
  servings: string;
  handleSetServings: (value: string) => void;
  setFoodComponents: React.Dispatch<
    React.SetStateAction<
      {
        food: IFood;
        servings: number;
      }[]
    >
  >;
}) {
  const { clearSelectedFood, selectedFood } = useFoods();

  const numServings = Number(props.servings);

  function handleAddFoodComponent() {
    if (selectedFood) {
      const newFoodComponent = {
        food: selectedFood,
        servings: Number(props.servings),
      };
      props.setFoodComponents((prevState) => [...prevState, newFoodComponent]);
    }
  }

  return (
    <div className={styles.selectedFoodPanelContainer}>
      <button
        className={styles.selectedFoodPanelButton}
        onClick={clearSelectedFood}
      >
        <FaArrowLeft />
      </button>
      <div className={styles.selectedFoodPanelDataContainer}>
        <div>
          <h3 className={styles.selectedFoodPanelName}>
            {props.selectedFood.name}
          </h3>
          <h4 className={styles.selectedFoodPanelBrand}>
            {props.selectedFood.brand}
          </h4>
        </div>
        <div className={styles.selectedFoodPanelSpaceBetweenRow}>
          <div>Serving Size</div>
          <div>{props.selectedFood.servingSize}g</div>
        </div>
        <div className={styles.selectedFoodPanelSpaceBetweenRow}>
          <label htmlFor='servings'>Servings</label>
          <input
            className={styles.servingsInput}
            type='number'
            name={'servings'}
            id={'servings'}
            value={props.servings}
            onChange={(evt) => props.handleSetServings(evt.target.value)}
          />
        </div>
        <div className={styles.selectedFoodPanelCalsMacrosContainer}>
          <div className={`${styles.numberContainer} ${styles.calories}`}>
            <div>{props.selectedFood.calories * numServings}</div>
            <div>cals</div>
          </div>
          <div className={`${styles.numberContainer} ${styles.fat}`}>
            <div>{props.selectedFood.macros.fat * numServings}g</div>
            <div>fat</div>
          </div>
          <div className={`${styles.numberContainer} ${styles.carbs}`}>
            <div>{props.selectedFood.macros.carbs * numServings}g</div>
            <div>carbs</div>
          </div>
          <div className={`${styles.numberContainer} ${styles.protein}`}>
            <div>{props.selectedFood.macros.protein * numServings}g</div>
            <div>protein</div>
          </div>
        </div>
        <button
          className={styles.addToYourFoodButton}
          onClick={handleAddFoodComponent}
        >
          Add to YourFood
        </button>
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
      <div>
        <div>{props.food.name}</div>
        <div className={styles.searchedFoodListItemBrand}>
          {props.food.brand}
        </div>
      </div>
      <div className={styles.calorieContainer}>
        <div>{props.food.calories}</div>
        <div>calories</div>
      </div>
    </li>
  );
}
