import { IFood } from '../../types/food';
import { StyledMealItem } from './meal-item.styled';

interface MealItemProps {
  food: IFood;
}

export default function MealItem(props: MealItemProps) {
  const { name, brand, servingSize, calories, macros } = props.food;
  return (
    <StyledMealItem>
      <p>
        {brand} {name}
      </p>
      <p>1</p>
      <p>{servingSize}</p>
      <p>{calories}</p>
      <div>
        <p>{macros.fat}</p>
        <p>{macros.protein}</p>
        <p>{macros.carbs}</p>
      </div>
      <p>delete</p>
    </StyledMealItem>
  );
}
