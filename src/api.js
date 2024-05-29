const API_URL = 'http://localhost:4001'; // Cambiar a 'https://full1.vercel.app' en producción

export async function login(email, password) {
  const response = await fetch(`${API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return response.json();
}

export async function register(name, email, password) {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  return response.json();
}

export async function getEvents() {
  const response = await fetch(`${API_URL}/api/events`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
  return response.json();
}

export async function getEventById(eventId) {
  const response = await fetch(`${API_URL}/api/events/${eventId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
  return response.json();
}

export async function createEventApi(title, date, location, description) {
  const response = await fetch(`${API_URL}/api/user/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, date, location, description }),
  });
  return response.json();
}

export async function confirmAttendance(eventId) {
  const response = await fetch(`${API_URL}/api/user/attendees/${eventId}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
}