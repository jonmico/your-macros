import { IMeal } from '../types/meal';

const API_URL = import.meta.env.PROD
  ? 'https://your-macros-backend.onrender.com'
  : '';

export async function createMeal(meal: IMeal) {
  const res = await fetch(`${API_URL}/api/meals/new`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ meal }),
  });

  return await res.json();
}
