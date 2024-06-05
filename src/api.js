const API_URL = 'http://localhost:4001'; // Cambiar a 'https://full1.vercel.app' en producción

export async function loginApi(email, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) throw new Error('Error al iniciar sesión');
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function registerApi(name, email, password) {
  try {
  const response = await fetch(`${API_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password }),
  });
  if (!response.ok) throw new Error('Error al registrar');
  return response.json();
} catch (error) {
  console.error(error);
  return null;
}
}

export async function getEvents() {
  try {
  const response = await fetch(`${API_URL}/api/events`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` },
  });
  return response.json();
} catch (error) {
  console.error(error);
  return [];
}
}

export async function getEventById(id) {
  try {
  const response = await fetch(`${API_URL}/api/events/${id}`)
  console.log('Estado de la respuesta:', response.status);
  if (!response.ok) {
    console.error('Error en la respuesta de getEventById:', response.statusText);
    throw new Error('Error al obtener evento');
  }
  const event = await response.json();
  console.log('Datos del evento:', event); // Mensaje de depuración
  return event;
} catch (error) {
  console.error('Error en getEventById:',error);
  return null;
}
}

export async function createEventApi(title, date, location, description) {
  try {
  const response = await fetch(`${API_URL}/api/users/events`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title, date, location, description }),
  });
  if (!response.ok) throw new Error('Error al crear evento');
  return response.json();
} catch (error) {
  console.error(error);
  return null;
}
}

export async function confirmAttendance(id) {
  try {
  const response = await fetch(`${API_URL}/api/users/attendees/${id}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json',
    },
  });
  return response.json();
} catch (error) {
  console.error(error);
  return null;
}
}

export async function getAttendeesByEventId(eventId) {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventId}/attendees`);
    if (!response.ok) {
      console.error('Error en la respuesta de getAttendeesByEventId:', response.statusText);
      throw new Error('Error al obtener los asistentes del evento');
    }
    const attendees = await response.json();
    console.log('Datos de los asistentes:', attendees); // Mensaje de depuración
    return attendees;
  } catch (error) {
    console.error('Error en getAttendeesByEventId:', error);
    return [];
  }
}