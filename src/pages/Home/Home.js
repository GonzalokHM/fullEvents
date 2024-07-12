import { getEvents } from '../../api';
import { LoginRegister } from '../LogRegister/LogRegister';
import { renderEventsList, renderOrganizers } from '../utils/render';
import { attachEventDetailListeners, setupOrganizerListeners } from './setupListeners';
import { createSpinner } from '../../utils/funtions';

export const Home = async () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }

  const user = JSON.parse(localStorage.getItem('user')); // Obtener la información del usuario

  const main = document.querySelector('main');
  main.innerHTML = '';

  const loading = document.createElement('div');
  loading.className = 'loading-container';
  main.appendChild(loading);

  const welcomeMessage = document.createElement('h3');
  welcomeMessage.id = 'welcomH3';
  welcomeMessage.textContent = `Welcome ${user.name}`;
  loading.appendChild(welcomeMessage);

  const spinner = createSpinner();
  loading.appendChild(spinner);

  spinner.style.display = 'block';

  try {
    const events = await getEvents();
    spinner.style.display = 'none';

    const organizersMap = new Map();

    events.forEach((event) => {
      if (event.organizer && event.organizer._id && !organizersMap.has(event.organizer._id)) {
        organizersMap.set(event.organizer._id, event.organizer);
      }
    });

    const organizers = Array.from(organizersMap.values());

    renderEventsList(
      events,
      main,
      () => renderOrganizers(
        organizers,
        main,
        () => renderEventsList(events, main, renderOrganizers, attachEventDetailListeners),
        () => setupOrganizerListeners(main, events)
      ),
      () => attachEventDetailListeners(Home)
    );
  } catch (error) {
    console.error('Error al cargar los eventos:', error);
    main.innerHTML = '<p>Error al cargar los eventos.</p>';
  }
};
