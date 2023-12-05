interface FoodSearchListProps {
  children: React.ReactNode;
}

export default function FoodSearchList(props: FoodSearchListProps) {
  return <ul>{props.children}</ul>;
}
