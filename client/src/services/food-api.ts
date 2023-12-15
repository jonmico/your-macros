import { IFood } from '../types/food';

const API_URL = import.meta.env.API_URL ?? '';

export async function createFood(food: IFood) {
  const res = await fetch(`${API_URL}/api/foods/new`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ food }),
  });

  const data = await res.json();

  return data;
}

export async function getFoods() {
  const res = await fetch(`${API_URL}/api/foods`);

  const data = await res.json();

  return data;
}

export async function getFoodByText(text: string) {
  const res = await fetch(`${API_URL}/api/foods/search/${text}`);
  const data = await res.json();

  return data;
}
