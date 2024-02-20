const API_URL = import.meta.env.PROD
  ? 'https://your-macros-backend.onrender.com'
  : '';

export async function apiGetLogs(userId: string) {
  try {
    const res = await fetch(`${API_URL}/api/logs/${userId}`);
    return await res.json();
  } catch (err) {
    console.error(err);
  }
}
