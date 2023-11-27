export interface IFood {
  brand: string;
  name: string;
  servingSize: number;
  macros: {
    carbs: number;
    fat: number;
    protein: number;
  };
}
