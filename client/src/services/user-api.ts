import { IMeal } from '../types/meal';
import { IPreIDLog } from '../types/pre-id-log';

const API_URL = import.meta.env.PROD
  ? 'https://your-macros-backend.onrender.com'
  : '';

export async function register(
  email: string,
  password: string,
  macros: { fat: number; carbs: number; protein: number },
  calories: number
) {
  const user = { email, password, macros, calories };

  const res = await fetch(`${API_URL}/api/user/register`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user }),
  });

  return await res.json();
}

export async function apiLogin(email: string, password: string) {
  const res = await fetch(`${API_URL}/api/user/login`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  return await res.json();
}

export async function apiLogout() {
  const res = await fetch(`${API_URL}/api/user/logout`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
  });

  return await res.json();
}

export async function apiFetchActiveSession() {
  const res = await fetch(`${API_URL}/api/user`);

  return await res.json();
}

export async function createLog(log: IPreIDLog) {
  const res = await fetch(`${API_URL}/api/user/log/new`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ log }),
  });

  return await res.json();
}

export async function addMealToLog(meal: IMeal, logId: string, userId: string) {
  const res = await fetch(`${API_URL}/api/user/log/${logId}/add-meal`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ meal, userId }),
  });

  return await res.json();
}
