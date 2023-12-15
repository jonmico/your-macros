import { FaCirclePlus } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { IFood } from '../../types/food';
import { ListItem } from './food-search-list-item.styled';
import { useMeals } from '../../hooks/useMeals';
import { IMealComponent } from '../../types/meal-component';
import { PlusButton } from '../button/button.styled';

interface FoodSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: FoodSearchListItemProps) {
  const { brand, name, servingSize, calories } = props.food;
  const { handleSelectFood } = useFoods();
  const { addToMeal, mealComponents } = useMeals();

  const isInMealComponents = mealComponents
    .map(({ food }) => food)
    .includes(props.food);

  function handleSelectClick() {
    handleSelectFood(props.food);
    console.log(props.food);
  }

  function handleAddToMeal(evt: React.MouseEvent<HTMLButtonElement>) {
    evt.stopPropagation();
    const mealComponent: IMealComponent = {
      food: props.food,
      servings: 1,
    };
    addToMeal(mealComponent);
  }

  return (
    <ListItem onClick={handleSelectClick}>
      <PlusButton
        $isInMealComponents={isInMealComponents}
        disabled={isInMealComponents}
        onClick={handleAddToMeal}
      >
        <FaCirclePlus />
      </PlusButton>
      <div>
        {brand} {name}
      </div>
      <div>{servingSize}g</div>
      <div>{calories}cals</div>
    </ListItem>
  );
}
