import { getAttendees, getAttendeesSortedByName } from '../../api';
import { LoginRegister } from '../LogRegister';
import { renderAttendees } from './render';
import { createSpinner } from '../../utils/funtions';
import './Attendees.css'

export const Attendees = async () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }

  const main = document.querySelector("main");
  main.innerHTML = '';

  const loading = document.createElement('div');
  loading.className = 'loading-container';
  main.appendChild(loading);

  const spinner = createSpinner();
  loading.appendChild(spinner);

  spinner.style.display = 'block';

  try {
    let attendees = await getAttendees();
    spinner.style.display = 'none';
    let sortedByName = false;

    main.innerHTML = `
      <button id="toggle-sort">Name order</button>
      <div id="attendees-container"></div>
    `;

    const sortButton = document.getElementById('toggle-sort');
    sortButton.addEventListener('click', async () => {
      sortedByName = !sortedByName;
      spinner.style.display = 'block';
      if (sortedByName) {
        attendees = await getAttendeesSortedByName();
        sortButton.textContent = 'First come';
      } else {
        attendees = await getAttendees();
        sortButton.textContent = 'Name order';
      }
      spinner.style.display = 'none';
      renderAttendees(attendees, main);
    });

    renderAttendees(attendees, main);
  } catch (error) {
    console.error('Error loading attendees:', error);
    main.innerHTML = "<p>Error loading attendees.</p>";
  }
};
