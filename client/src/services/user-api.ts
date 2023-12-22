const API_URL = import.meta.env.PROD
  ? 'https://your-macros-backend.onrender.com'
  : '';

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/user/login`, {
    method: 'post',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return await res.json();
}

export async function fetchActiveSession() {
  const res = await fetch(`${API_URL}/api/user`);

  return await res.json();
}
