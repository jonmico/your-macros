import { IFood } from '../types/food';

export async function createFood(food: IFood) {
  const res = await fetch('/api/foods/new', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ food }),
  });

  const data = await res.json();

  return data;
}

export async function getFoods() {
  const res = await fetch('/api/foods');

  const data = await res.json();

  return data;
}

export async function getFoodByText(text: string) {
  const res = await fetch(`/api/foods/search?name=${text}`);
  const data = await res.json();

  return data;
}
