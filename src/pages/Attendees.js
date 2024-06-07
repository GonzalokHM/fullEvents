import { getAttendees, getAttendeesSortedByName } from '../api';
import { LoginRegister } from './LogRegister';

export const Attendees = async () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }

  const main = document.querySelector("main");
  main.innerHTML = "<p>Cargando...</p>"; // Mensaje de carga

  try {
    let attendees = await getAttendees();
    let sortedByName = false;

    const renderAttendees = (attendees) => {
      const attendeesHtml =`
        <button id="toggle-sort">Ordenar por Nombre</button>
        <div id="attendees-list">
          ${attendees.map(attendee => `
            <div class="attendee" data-id="${attendee._id}">
              <h4>${attendee.name}</h4>
              <div class="attendee-details" style="display: none;">
                <p>Email: ${attendee.email}</p>
                <h5>Eventos:</h5>
                <ul>
                  ${attendee.events.map(event => `
                    <li>
                      <strong>${event.title}</strong>
                      <p>${event.date}</p>
                      <p>${event.location}</p>
                    </li>
                  `).join('')}
                </ul>
              </div>
            </div>
          `).join('')}
        </div>
      `;

      main.innerHTML = attendeesHtml;

      const sortButton = document.getElementById('toggle-sort');
      sortButton.addEventListener('click', async () => {
        sortedByName = !sortedByName;
        if (sortedByName) {
          attendees = await getAttendeesSortedByName();
          sortButton.textContent = 'Ordenar por Llegada';
        } else {
          attendees = await getAttendees();
          sortButton.textContent = 'Ordenar por Nombre';
        }
        renderAttendees(attendees);
      });

      const attendeeElements = document.querySelectorAll('.attendee');
      attendeeElements.forEach(attendeeElement => {
        attendeeElement.addEventListener('click', () => {
          const details = attendeeElement.querySelector('.attendee-details');
          if (details.style.display === 'none') {
            document.querySelectorAll('.attendee-details').forEach(detail => {
              detail.style.display = 'none';
            });
            details.style.display = 'block';
          } else {
            details.style.display = 'none';
          }
        });
      });
    };

    renderAttendees(attendees);
  } catch (error) {
    console.error('Error al cargar los asistentes:', error);
    main.innerHTML = "<p>Error al cargar los asistentes.</p>";
  }
};