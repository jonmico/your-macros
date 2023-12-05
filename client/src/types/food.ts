export interface IFood {
  _id: string;
  brand: string;
  name: string;
  servingSize: number;
  calories: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
}
