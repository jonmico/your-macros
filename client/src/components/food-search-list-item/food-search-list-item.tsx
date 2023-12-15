import { FaCirclePlus } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { IFood } from '../../types/food';
import { ListItem } from './food-search-list-item.styled';
import { useMeals } from '../../hooks/useMeals';
import { IMealComponent } from '../../types/meal-component';
import { IconType } from 'react-icons';

interface FoodSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: FoodSearchListItemProps) {
  const { brand, name, servingSize, calories } = props.food;
  const { handleSelectFood } = useFoods();
  const { addToMeal } = useMeals();

  function handleSelectClick() {
    handleSelectFood(props.food);
    console.log(props.food);
  }

  function handleAddToMeal(evt: React.MouseEvent<IconType>) {
    evt.stopPropagation();
    const mealComponent: IMealComponent = {
      food: props.food,
      servings: 1,
    };
    addToMeal(mealComponent);
  }

  return (
    <ListItem onClick={handleSelectClick}>
      <FaCirclePlus onClick={handleAddToMeal} />
      <div>
        {brand} {name}
      </div>
      <div>{servingSize}g</div>
      <div>{calories}cals</div>
    </ListItem>
  );
}
