import { getEventById, confirmAttendance } from '../api';

    export async function EventDetails(eventId) {
      const event = await getEventById(eventId);
  
    return `
      <div>
        <h2>${event.title}</h2>
        <p>${event.date}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
        <button onclick="confirmAttendanceHandler('${event._id}')">Confirmar Asistencia</button>
        <h3>Asistentes</h3>
        <ul>
          ${event.attendees.map(attendee => `<li>${attendee.name}</li>`).join('')}
        </ul>
      </div>
    `;
  }
  
  async function confirmAttendanceHandler(eventId) {

    const response = await confirmAttendance(eventId);
  
    if (response.ok) {
      alert('Asistencia confirmada');
      window.location.reload();
    } else {
      alert('Error al confirmar asistencia');
    }
  }
  