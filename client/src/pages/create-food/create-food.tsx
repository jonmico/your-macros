import CreateFoodForm from '../../components/create-food-form/create-food-form';
import { StyledH2BottomBorder } from '../../components/styled-header/styled-header.styled';

export default function CreateFood() {
  return (
    <div>
      <StyledH2BottomBorder>Create Food</StyledH2BottomBorder>
      <CreateFoodForm />
    </div>
  );
}
