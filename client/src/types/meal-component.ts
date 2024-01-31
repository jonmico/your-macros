import { IFood } from './food';

export interface IMealComponent {
  _id: string;
  food: IFood;
  servings: number;
}
