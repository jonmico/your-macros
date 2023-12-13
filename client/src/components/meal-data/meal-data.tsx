import { StyledMealData, MealDataNumber } from './meal-data.styled';
import {
  CalorieContainer,
  ProteinContainer,
  FatContainer,
  CarbsContainer,
} from '../macro-container/macro-container.styled';

interface MealDataProps {
  mealData: {
    calories: number;
    fat: number;
    protein: number;
    carbs: number;
  };
}

export default function MealData(props: MealDataProps) {
  const { mealData } = props;
  return (
    <StyledMealData>
      <CalorieContainer>
        <MealDataNumber>{mealData.calories}</MealDataNumber>
        <p>cals</p>
      </CalorieContainer>
      <FatContainer>
        <MealDataNumber>{mealData.fat}g</MealDataNumber>
        <p>fat</p>
      </FatContainer>
      <CarbsContainer>
        <MealDataNumber>{mealData.carbs}g</MealDataNumber>
        <p>carbs</p>
      </CarbsContainer>
      <ProteinContainer>
        <MealDataNumber>{mealData.protein}g</MealDataNumber>
        <p>protein</p>
      </ProteinContainer>
    </StyledMealData>
  );
}
