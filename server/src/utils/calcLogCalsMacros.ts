import ILog from '../types/log';

const CALORIES_PER_GRAM_PROTEIN_CARBS = 4;
const CALORIES_PER_GRAM_FAT = 9;

export default function calcLogCalsMacros(log: ILog) {
  if (!log.meals) {
    return { message: 'No meals in log to calculate.' };
  }

  const carbs = log.meals.reduce((prev, curr) => prev + curr.macros.carbs, 0);
  const fat = log.meals.reduce((prev, curr) => prev + curr.macros.fat, 0);
  const protein = log.meals.reduce(
    (prev, curr) => prev + curr.macros.protein,
    0
  );

  const calories =
    carbs * CALORIES_PER_GRAM_PROTEIN_CARBS +
    fat * CALORIES_PER_GRAM_FAT +
    protein * CALORIES_PER_GRAM_PROTEIN_CARBS;

  const macros = { carbs, fat, protein };

  return { macros, calories };
}
