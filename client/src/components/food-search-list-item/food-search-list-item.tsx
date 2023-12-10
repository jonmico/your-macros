import { FaCirclePlus } from 'react-icons/fa6';
import { useFoods } from '../../hooks/useFoods';
import { IFood } from '../../types/food';
import { ListItem } from './food-search-list-item.styled';

interface FoodSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: FoodSearchListItemProps) {
  const { brand, name, servingSize, calories } = props.food;
  const { handleSelectFood } = useFoods();

  function handleClick() {
    handleSelectFood(props.food);
    console.log(props.food);
  }

  return (
    <ListItem onClick={handleClick}>
      <FaCirclePlus />
      <div>
        {brand} {name}
      </div>
      <div>{servingSize}g</div>
      <div>{calories}cals</div>
    </ListItem>
  );
}
