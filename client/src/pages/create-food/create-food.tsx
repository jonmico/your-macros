import CreateFoodForm from '../../components/create-food-form/create-food-form';
import { StyledH2 } from './create-food.styled';

export default function CreateFood() {
  return (
    <div>
      <StyledH2>Create Food</StyledH2>
      <CreateFoodForm />
    </div>
  );
}
