import ILog from '../types/log';
import IMeal from '../types/meal';

const API_URL = import.meta.env.PROD
  ? 'https://your-macros-backend.onrender.com'
  : '';

export async function register(email: string, password: string) {
  const user = { email, password };

  const res = await fetch(`${API_URL}/api/user/register`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ user }),
  });

  return await res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/user/login`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return await res.json();
}

export async function logout() {
  const res = await fetch(`${API_URL}/api/user/logout`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
  });

  return await res.json();
}

export async function fetchActiveSession() {
  const res = await fetch(`${API_URL}/api/user`);

  return await res.json();
}

export async function createLog(log: ILog) {
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
    body: JSON.stringify({ meal, userId, logId }),
  });

  return await res.json();
}
