import { renderEventCard } from '../../utils/renders';

export const renderEventsList = (events, main, renderOrganizers, attachEventDetailListeners) => {
  main.innerHTML = `
    <button id="toggle-organizers">Show Organizers</button>
    <div class="events">
      ${events.map(renderEventCard).join('')}
    </div>
  `;

  attachEventDetailListeners();
  document
    .getElementById('toggle-organizers')
    .addEventListener('click', renderOrganizers);
};

export const renderOrganizers = (organizers, main, renderEventsList, setupOrganizerListeners) => {
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
