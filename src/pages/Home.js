import { getEvents, getEventsByOrganizer } from '../api';
import { EventDetails } from './EventDetail';
import { LoginRegister } from './LogRegister';

export const Home = async () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }

  const user = JSON.parse(localStorage.getItem('user')); // Obtener la información del usuario

  const main = document.querySelector('main');
  main.innerHTML = '';

  const welcomeMessage = document.createElement('h3');
  welcomeMessage.id = 'welcomH3';
  welcomeMessage.textContent = `Welcome ${user.name}`;
  main.appendChild(welcomeMessage);

  try {
    const events = await getEvents();

    const organizersMap = new Map();

    events.forEach((event) => {
      if (
        event.organizer &&
        event.organizer._id &&
        !organizersMap.has(event.organizer._id)
      ) {
        organizersMap.set(event.organizer._id, event.organizer);
      }
    });

    const organizers = Array.from(organizersMap.values());

    const renderOrganizers = () => {
      main.innerHTML = `
        <button id="toggle-organizers">Show Events</button>
        <div id="organizers-list">
          ${organizers
            .map(
              (organizer) => `
            <div class="organizer" data-id="${organizer._id}">
              <h4>${organizer.name}</h4>
            </div>
          `
            )
            .join('')}
        </div>
      `;

      document
        .getElementById('toggle-organizers')
        .addEventListener('click', renderEventsList);

      setupOrganizerListeners();
    };

    const renderEventsList = () => {
      main.innerHTML = `
        <button id="toggle-organizers">Show Organizers</button>
        <div class="events">
          ${events
            .map(
              (event) => `
            <div class="event" data-id="${event._id}">
              <h3>${event.title}</h3>
              <p>📆 ${event.date}</p>
              <p>📍 ${event.location}</p>
              <p> ℹ️ ${event.description}</p>
              <button class="show-more">Show More</button>
            </div>
          `
            )
            .join('')}
        </div>
      `;

      attachEventDetailListeners(Home);
      document
        .getElementById('toggle-organizers')
        .addEventListener('click', renderOrganizers);
    };

    const attachEventDetailListeners = (backTo) => {
      document.querySelectorAll('.event .show-more').forEach(button => {
        button.addEventListener('click', (e) => {
          const eventId = e.target.closest('.event').getAttribute('data-id');
          EventDetails(eventId, backTo);
        });
      });
    };

    const setupOrganizerListeners = () => {
      document.querySelectorAll('.organizer').forEach(organizerElement => {
        organizerElement.addEventListener('click', async () => {
          const organizerId = organizerElement.getAttribute('data-id');
          const organizerEvents = await getEventsByOrganizer(organizerId);
          main.innerHTML = `
            <button id="back-to-organizers" class="back-button">⬅ Back to Organizers</button>
            <div class="events">
              ${organizerEvents
                .map(
                  (event) => `
                <div class="event" data-id="${event._id}">
                  <h3>${event.title}</h3>
                  <p>📆 ${event.date}</p>
                  <p>📍 ${event.location}</p>
                  <p> ℹ️ ${event.description}</p>
                  <button class="show-more">Show More</button>
                </div>
              `
                )
                .join('')}
            </div>
          `;

          document
            .getElementById('back-to-organizers')
            .addEventListener('click', renderOrganizers);

          attachEventDetailListeners(() => {
            const renderBackToOrganizers = async () => {
              const organizerEvents = await getEventsByOrganizer(organizerId);
              main.innerHTML = `
                <button id="back-to-organizers" class="back-button">⬅ Back to Organizers</button>
                <div class="events">
                  ${organizerEvents
                    .map(
                      (event) => `
                    <div class="event" data-id="${event._id}">
                      <h3>${event.title}</h3>
                      <p>📆 ${event.date}</p>
                      <p>📍 ${event.location}</p>
                      <p> ℹ️ ${event.description}</p>
                      <button class="show-more">Show More</button>
                    </div>
                  `
                    )
                    .join('')}
                </div>
              `;

              document
                .getElementById('back-to-organizers')
                .addEventListener('click', renderOrganizers);

              attachEventDetailListeners(renderBackToOrganizers);
            };

            renderBackToOrganizers();
          });
        });
      });
    };

    renderEventsList();
  } catch (error) {
    console.error('Error al cargar los eventos:', error);
    main.innerHTML = '<p>Error al cargar los eventos.</p>';
  }
};
