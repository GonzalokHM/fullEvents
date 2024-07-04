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

    // Función para actualizar la lista de asistentes
    const updateAttendeesList = async () => {
      const attendeesListDiv = document.getElementById('attendees-list');
      const attendees = await getAttendeesByEventId(id);
      if (attendees && attendees.length > 0) {
        attendeesListDiv.innerHTML = `
          <h4>Attendees:</h4>
          <ul>
            ${attendees.map((attendee) => `<li>${attendee.name} (${attendee.email})</li>`).join('')}
          </ul>
        `;
      } else {
        attendeesListDiv.innerHTML = '<p>No attendees for this event.</p>';
      }
      attendeesListDiv.style.display = 'block';
    };


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
      console.error('Failed to verify attendance:', error);
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
      // Actualizar la lista de asistentes
      if (document.getElementById('attendees-list').style.display === 'block') {
        await updateAttendeesList();
      }
    });

    document
      .getElementById('show-attendees')
      .addEventListener('click', async () => {
        const attendeesListDiv = document.getElementById('attendees-list');
        if (attendeesListDiv.style.display === 'none') {
          await updateAttendeesList();
        } else {
          attendeesListDiv.style.display = 'none';
        }
      });

      document.getElementById('back-to-events').addEventListener('click', backTo);
  } catch (error) {
    console.error('Event Loading Failed:', error);
    main.innerHTML = '<p>Event Loading Failed!</p>';
  }
};
