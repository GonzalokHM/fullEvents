import { getEventById, confirmAttendance, getAttendeesByEventId, cancelAttendance } from '../api';

export const EventDetails = async (id, backTo) => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }
  const main = document.querySelector('main');
  main.innerHTML = '';
  try {
    const event = await getEventById(id);

    if (!event) {
      main.innerHTML = '<p>Event Loading Failed!</p>';
      return;
    }

    const eventDiv = document.createElement('div');
    eventDiv.className = 'event-details';
    eventDiv.innerHTML = `
    <button id="back-to-events" class="back-button">⬅ Back to Events</button>
    <h3>${event.title}</h3>
    <p>📆${event.date}</p>
    <p>📍${event.location}</p>
    <p>ℹ️${event.description}</p>
    <button id="confirm-attendance">Confirm Attendance</button>
    <button id="show-attendees">List of Attendees</button>
      <div id="attendees-list" style="display: none;"></div>
  `;
    main.innerHTML = ''; // Limpiar el mensaje de carga
    main.appendChild(eventDiv);

    const confirmButton = document.getElementById('confirm-attendance');

    // Verificar si el usuario ya ha confirmado su asistencia
    try {
      const attendees = await getAttendeesByEventId(id);
      const userEmail = JSON.parse(localStorage.getItem('user')).email;
      const isAttending = attendees.some(attendee => attendee.email === userEmail);

      if (isAttending) {
        confirmButton.textContent = 'Cancel Attendance';
        confirmButton.style.backgroundColor = 'red';
      }
    } catch (error) {
      console.error('Error al verificar la asistencia:', error);
    }

    confirmButton.addEventListener('click', async () => {
      if (confirmButton.textContent === 'Confirm Attendance') {
        await confirmAttendance(id);
        confirmButton.textContent = 'Cancel Attendance';
        confirmButton.style.backgroundColor = 'red';
        alert('Confirmed attendance');
      } else {
        await cancelAttendance(id);
        confirmButton.textContent = 'Confirm Attendance';
        confirmButton.style.backgroundColor = '';
        alert('Cancelled attendance');
      }
    });

    document
      .getElementById('show-attendees')
      .addEventListener('click', async () => {
        const attendeesListDiv = document.getElementById('attendees-list');
        if (attendeesListDiv.style.display === 'none') {
          const attendees = await getAttendeesByEventId(id);
          if (attendees && attendees.length > 0) {
            attendeesListDiv.innerHTML = `
          <h4>Asistentes:</h4>
          <ul>
            ${attendees
              .map(
                (attendee) => `<li>${attendee.name} (${attendee.email})</li>`
              )
              .join('')}
          </ul>
        `;
          } else {
            attendeesListDiv.innerHTML =
              '<p>No hay asistentes para este evento.</p>';
          }
          attendeesListDiv.style.display = 'block';
        } else {
          attendeesListDiv.style.display = 'none';
        }
      });
      document.getElementById('back-to-events').addEventListener('click', backTo);
  } catch (error) {
    console.error('Error al cargar el evento:', error);
    main.innerHTML = '<p>Event Loading Failed!</p>';
  }
};
