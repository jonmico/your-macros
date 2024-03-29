import { IMeal } from '../types/meal';
import { IPreIDLog } from '../types/pre-id-log';

const API_URL = import.meta.env.PROD
  ? 'https://your-macros-backend.onrender.com'
  : '';

export async function apiRegister(
  email: string,
  password: string,
  macros: { fat: number; carbs: number; protein: number },
  calories: number
) {
  const user = { email, password, macros, calories };

  const res = await fetch(`${API_URL}/api/user/register`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user }),
  });

  return await res.json();
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/user/login`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
}

export async function apiLogout() {
  const res = await fetch(`${API_URL}/api/user/logout`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
  });

  return await res.json();
}

export async function apiFetchActiveSession() {
  const res = await fetch(`${API_URL}/api/user`);

  return await res.json();
}

export async function apiCreateLog(log: IPreIDLog) {
  const res = await fetch(`${API_URL}/api/user/log/new`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ log }),
  });

  return await res.json();
}

export async function apiAddMealToLog(
  meal: IMeal,
  logId: string,
  userId: string
) {
  const res = await fetch(`${API_URL}/api/user/log/${logId}/add-meal`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ meal, userId }),
  });

  return await res.json();
}

export async function apiDeleteLog(logId: string, userId: string) {
  const res = await fetch(`${API_URL}/api/user/log/${logId}/delete`, {
    method: 'DELETE',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ logId, userId }),
  });

  return await res.json();
}

export async function apiDeleteMealFromLog(
  mealId: string,
  logId: string,
  userId: string
) {
  const res = await fetch(
    `${API_URL}/api/user/log/${logId}/delete-meal/${mealId}`,
    {
      method: 'DELETE',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ mealId, logId, userId }),
    }
  );

  return await res.json();
}

export async function apiEditMealInLog(
  userId: string,
  logId: string,
  meal: IMeal
) {
  const res = await fetch(
    `${API_URL}/api/user/log/${logId}/edit-meal/${meal._id}`,
    {
      method: 'PATCH',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ userId, logId, meal }),
    }
  );

  return await res.json();
}
