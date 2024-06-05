import { getEventById, confirmAttendance, getAttendeesByEventId } from '../api';

export const EventDetails = async (id) => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return
  }
  const main = document.querySelector("main");
  main.innerHTML = "";
try{
  console.log('ID del evento:', id);
  const event = await getEventById(id);

  if (!event) {
    main.innerHTML = "<p>Error al cargar el evento.</p>";
    return;
  }

  console.log('Evento cargado:', event);

  const eventDiv = document.createElement("div");
  eventDiv.className = "event-details";
  eventDiv.innerHTML = `
    <h3>${event.title}</h3>
    <p>${event.date}</p>
    <p>${event.location}</p>
    <p>${event.description}</p>
    <button id="confirm-attendance">Confirmar Asistencia</button>
    <button id="show-attendees">Lista de Asistentes</button>
      <div id="attendees-list" style="display: none;"></div>
  `;
  main.innerHTML = ''; // Limpiar el mensaje de carga
  main.appendChild(eventDiv);

  document.getElementById('confirm-attendance').addEventListener('click', async () => {
    await confirmAttendance(id);
    alert('Asistencia confirmada');
  });
  document.getElementById('show-attendees').addEventListener('click', async () => {
    const attendeesListDiv = document.getElementById('attendees-list');
    if (attendeesListDiv.style.display === 'none') {
      const attendees = await getAttendeesByEventId(id);
      if (attendees && attendees.length > 0) {
        attendeesListDiv.innerHTML = `
          <h4>Asistentes:</h4>
          <ul>
            ${attendees.map(attendee => `<li>${attendee.name} (${attendee.email})</li>`).join('')}
          </ul>
        `;
      } else {
        attendeesListDiv.innerHTML = "<p>No hay asistentes para este evento.</p>";
      }
      attendeesListDiv.style.display = 'block';
    } else {
      attendeesListDiv.style.display = 'none';
    }
  });
} catch (error) {
  console.error('Error al cargar el evento:', error);
  main.innerHTML = "<p>Error al cargar el evento.</p>";
}
};