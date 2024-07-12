import { renderAttendee } from '../../utils/funtions';

export const renderAttendees = (attendees, main) => {
  const attendeesHtml = `
    <div id="attendees-list" class="grid-container">
      ${attendees.map(renderAttendee).join('')}
    </div>
  `;

  main.querySelector('#attendees-container').innerHTML = attendeesHtml;

  const attendeeElements = document.querySelectorAll('.attendee');
  attendeeElements.forEach(attendeeElement => {
    attendeeElement.addEventListener('click', () => {
      const details = attendeeElement.querySelector('.attendee-details');
      if (details.style.display === 'none') {
        document.querySelectorAll('.attendee-details').forEach(detail => {
          detail.style.display = 'none';
        });
        details.style.display = 'block';
        attendeeElement.classList.add('expanded');
      } else {
        details.style.display = 'none';
        attendeeElement.classList.remove('expanded');
      }
    });
  });
};
