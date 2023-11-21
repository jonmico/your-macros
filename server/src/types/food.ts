export default interface IFood {
  name: string;
  servingSize: number;
  calories: number;
  macros: {
    fat: number;
    carbs: number;
    protein: number;
  };
}
