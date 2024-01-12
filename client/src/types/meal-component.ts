import { IFood } from './food';
import { IYourFood } from './your-food';

export interface IMealComponent {
  food: IFood | IYourFood;
  servings: number;
}
