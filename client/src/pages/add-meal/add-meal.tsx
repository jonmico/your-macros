import { useState } from 'react';
import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';
import { AddMealUI } from './add-meal.styled';
import { IFood } from '../../types/food';

export default function AddMeal() {
  const [searchedFoods, setSearchedFoods] = useState<IFood[]>([]);
  const [selectedFood, setSelectedFood] = useState<IFood | null>(null);

  function handleClick(food: IFood) {
    setSelectedFood(food);
  }

  return (
    <div>
      <StyledH2BottomBorder>Add Meal</StyledH2BottomBorder>
      <AddMealUI>
        <FoodSearch
          searchedFoods={searchedFoods}
          setSearchedFoods={setSearchedFoods}
          handleClick={handleClick}
        />
        <FoodInfo />
      </AddMealUI>
    </div>
  );
}
