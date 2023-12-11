import { StyledMealList } from './meal-list.styled';

interface MealListProps {
  children: React.ReactNode;
}

export default function MealList(props: MealListProps) {
  return <StyledMealList>{props.children}</StyledMealList>;
}
