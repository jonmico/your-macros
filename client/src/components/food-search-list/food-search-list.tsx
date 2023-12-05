import { StyledFoodSearchList } from './food-search-list.styled';

interface FoodSearchListProps {
  children: React.ReactNode;
}

export default function FoodSearchList(props: FoodSearchListProps) {
  return <StyledFoodSearchList>{props.children}</StyledFoodSearchList>;
}
