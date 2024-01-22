import FoodInfo from '../../components/food-info/food-info';
import FoodSearch from '../../components/food-search/food-search';
import MealBuilder from '../../components/meal-builder/meal-builder';
import PageHeader from '../../components/page-header/page-header';
import { FoodProvider } from '../../contexts/food-context';
import { MealProvider } from '../../contexts/meal-context';
import { AddMealUI, SearchInfoRow } from './add-meal.styled';

export default function AddMeal() {
  return (
    <div>
      <PageHeader>Add Meal</PageHeader>
      <AddMealUI>
        <MealProvider>
          <MealBuilder />
          <FoodProvider>
            <FoodSearch />
            <FoodInfo />
          </FoodProvider>
        </MealProvider>
      </AddMealUI>
    </div>
  );
}
