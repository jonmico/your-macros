import { IFood } from '../types/food';

export async function createFood(food: IFood) {
  const res = await fetch('/api/foods/new', {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ food }),
  });

  if (!res.ok) {
    throw new Error(`Post request failed with error code: ${res.status}`);
  }

  const data = await res.json();

  return data;
}

export async function getFoods() {
  const res = await fetch('/api/foods', {
    method: 'get',
    headers: { 'content-type': 'application/json' },
  });

  if (!res.ok) {
    throw new Error(`Something went wrong: ${res.status} error.`);
  }

  const data = await res.json();

  return data;
}
