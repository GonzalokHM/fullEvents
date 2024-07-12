import { EventDetails } from '../Home/EventDetail';
import { getEventsByOrganizer } from '../../api';
import { renderOrganizers, renderEventsList } from './render';
import { createSpinner } from '../../utils/funtions'
import { renderEventCard } from '../../utils/renders';

const spinner = createSpinner();

export const attachEventDetailListeners = (backTo) => {
  document.querySelectorAll('.event .show-more').forEach((button) => {
    button.addEventListener('click', (e) => {
      const eventId = e.target.closest('.event').getAttribute('data-id');
      EventDetails(eventId, backTo);
    });
  });
};

export const setupOrganizerListeners = (main, events) => {
  document.querySelectorAll('.organizer').forEach((organizerElement) => {
    organizerElement.addEventListener('click', async () => {
      spinner.style.display = 'block';
      const organizerId = organizerElement.getAttribute('data-id');
      const organizerEvents = await getEventsByOrganizer(organizerId);
      spinner.style.display = 'none';
      main.innerHTML = `
        <button id="back-to-organizers" class="back-button">⬅ Back to Organizers</button>
        <div class="events">
          ${organizerEvents.map(renderEventCard).join('')}
        </div>
      `;

      document
        .getElementById('back-to-organizers')
        .addEventListener('click', () => renderOrganizers(events, main, () => renderEventsList(events, main, renderOrganizers, attachEventDetailListeners), () => setupOrganizerListeners(main, events)));

      attachEventDetailListeners(() => {
        const renderBackToOrganizers = async () => {
          spinner.style.display = 'block';
          const organizerEvents = await getEventsByOrganizer(organizerId);
          spinner.style.display = 'none';
          main.innerHTML = `
            <button id="back-to-organizers" class="back-button">⬅ Back to Organizers</button>
            <div class="events">
              ${organizerEvents.map(renderEventCard).join('')}
            </div>
          `;

          document
            .getElementById('back-to-organizers')
            .addEventListener('click', () => renderOrganizers(events, main, () => renderEventsList(events, main, renderOrganizers, attachEventDetailListeners), () => setupOrganizerListeners(main, events)));

          attachEventDetailListeners(renderBackToOrganizers);
        };

        renderBackToOrganizers();
      });
    });
  });
};
