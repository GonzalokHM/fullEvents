const API_URL = 'https://fullbackevents.vercel.app'; // Cambiar a 'http://localhost:4001' para desarrollo

export async function loginApi(email, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al iniciar sesión');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function registerApi(name, email, password) {
  try {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Error al registrar');
    }
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function getEvents() {
  try {
    const response = await fetch(`${API_URL}/api/events`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    if (!response.ok) throw new Error('Error al obtener los eventos');
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function getEventsByOrganizer(organizerId) {
  try {
    const response = await fetch(
      `${API_URL}/api/events/findOrganizerByid/${organizerId}`,
      {
        method: 'GET',
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
    if (!response.ok)
      throw new Error('Error al obtener los eventos by organizer');
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function getEventById(id) {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`);
    if (!response.ok) {
      console.error(
        'Error en la respuesta de getEventById:',
        response.statusText
      );
      throw new Error('Error al obtener evento');
    }
    const event = await response.json();
    return event;
  } catch (error) {
    console.error('Error en getEventById:', error);
    return { error: error.message };
  }
}

export async function createEventApi(title, date, location, description) {
  try {
    const response = await fetch(`${API_URL}/api/users/events`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, date, location, description }),
    });
    if (!response.ok) throw new Error('Error al crear evento');
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function confirmAttendance(id) {
  try {
    const response = await fetch(`${API_URL}/api/users/attendees/${id}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function cancelAttendance(id) {
  try {
    const response = await fetch(`${API_URL}/api/users/attendees/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json',
      },
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

export async function getAttendeesByEventId(eventId) {
  try {
    const response = await fetch(`${API_URL}/api/events/${eventId}/attendees`);
    if (!response.ok) {
      console.error(
        'Error en la respuesta de getAttendeesByEventId:',
        response.statusText
      );
      throw new Error('Error al obtener los asistentes del evento');
    }
    const attendees = await response.json();
    return attendees;
  } catch (error) {
    console.error('Error en getAttendeesByEventId:', error);
    return { error: error.message };
  }
}

export async function getAttendees() {
  try {
    const response = await fetch(`${API_URL}/api/attendees`);
    if (!response.ok) {
      console.error(
        'Error en la respuesta de getAttendees:',
        response.statusText
      );
      throw new Error('Error al obtener asistentes');
    }
    const attendees = await response.json();
    return attendees;
  } catch (error) {
    console.error('Error en getAttendees:', error);
    return { error: error.message };
  }
}

export async function getAttendeesSortedByName() {
  try {
    const response = await fetch(`${API_URL}/api/attendees/order/sortedName`);
    if (!response.ok) {
      console.error(
        'Error en la respuesta de getAttendeesSortedByName:',
        response.statusText
      );
      throw new Error('Error al obtener asistentes ordenados por nombre');
    }
    const attendees = await response.json();
    return attendees;
  } catch (error) {
    console.error('Error en getAttendeesSortedByName:', error);
    return { error: error.message };
  }
}
