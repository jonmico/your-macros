import { IFood } from '../../types/food';
import { ListItem } from './food-search-list-item.styled';
interface FoodSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: FoodSearchListItemProps) {
  const { brand, name, servingSize, calories } = props.food;
  return (
    <ListItem>
      <div>{brand}</div>
      <div>{name}</div>
      <div>{servingSize}g</div>
      <div>{calories}cals</div>
    </ListItem>
  );
}
