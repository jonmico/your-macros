import { IFood } from '../../types/food';

interface FoodSearchListItemProps {
  food: IFood;
}
export default function FoodSearchListItem(props: FoodSearchListItemProps) {
  const { brand, name, servingSize } = props.food;
  return <li>{brand}</li>;
}
