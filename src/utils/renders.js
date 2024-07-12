export const renderEvent = (event) => {
  return `
      <h3>${event.title}</h3>
      <p>📆 ${event.date}</p>
      <p>📍 ${event.location}</p>
      <p> ℹ️ ${event.description}</p>
    `;
};

export const renderEventDetail = (event) => {
  return `
      <h2>${event.title}</h2>
      <p>${event.description}</p>
      <p>📆 ${event.date}</p>
      <p>📍 ${event.location}</p>
    `;
};

export const renderEventCard = (event) => {
  return `
      <div class="event" data-id="${event._id}">
        ${renderEvent(event)}
        <button class="show-more">Show More</button>
      </div>
    `;
};

export const renderAttendee = (attendee) => {
  return `
    <div class="attendee grid-item" data-id="${attendee._id}">
      <h4>${attendee.name}</h4>
      <div class="attendee-details" style="display: none;">
        <p>Email: ${attendee.email}</p>
        <h5>Events:</h5>
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
  `;
};

