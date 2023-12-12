import { IFood } from '../../types/food';
import MealItem from '../meal-item/meal-item';
import MealListHeader from '../meal-list-header/meal-list-header';
import MealList from '../meal-list/meal-list';
import {
  StyledMealBuilder,
  MealNameInput,
  MealData,
  Calories,
  MealDataNumber,
  Fat,
  Carbs,
  Protein,
} from './meal-builder.styled';

interface MealBuilderProps {
  meal: IFood[];
  mealName: string;
  setMealName: React.Dispatch<React.SetStateAction<string>>;
}

export default function MealBuilder(props: MealBuilderProps) {
  const { meal, mealName, setMealName } = props;

  const mealCalories = meal.reduce((prev, curr) => prev + curr.calories, 0);
  const mealFat = meal.reduce((prev, curr) => prev + curr.macros.fat, 0);
  const mealCarbs = meal.reduce((prev, curr) => prev + curr.macros.carbs, 0);
  const mealProtein = meal.reduce(
    (prev, curr) => prev + curr.macros.protein,
    0
  );
  return (
    <StyledMealBuilder>
      <MealNameInput
        placeholder={'Meal Name'}
        type='text'
        value={mealName}
        onChange={(evt) => setMealName(evt.target.value)}
      />
      <MealData>
        <Calories>
          <MealDataNumber>{mealCalories}</MealDataNumber>
          <p>cals</p>
        </Calories>
        <Fat>
          <MealDataNumber>{mealFat}g</MealDataNumber>
          <p>fat</p>
        </Fat>
        <Carbs>
          <MealDataNumber>{mealCarbs}g</MealDataNumber>
          <p>carbs</p>
        </Carbs>
        <Protein>
          <MealDataNumber>{mealProtein}g</MealDataNumber>
          <p>protein</p>
        </Protein>
      </MealData>
      <MealList>
        <MealListHeader />
        {meal.map((food) => (
          <MealItem food={food} />
        ))}
      </MealList>
    </StyledMealBuilder>
  );
}
