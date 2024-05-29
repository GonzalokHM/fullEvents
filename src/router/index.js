import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { HomePage } from '../pages/HomePage';
import { EventPage } from '../pages/EventPage';
import { CreateEventPage } from '../pages/CreateEventPage';

const root = document.getElementById('app');

function render(content) {
  root.innerHTML = content;
}

async function handleRoute() {
  const hash = window.location.hash || '#/login';
  const [_, route, id] = hash.split('/');

  switch (route) {
    case 'login':
      render(LoginPage());
      break;
    case 'register':
      render(RegisterPage());
      break;
    case 'home':
      render(await HomePage());
      break;
    case 'event':
      render(await EventPage(id));
      break;
    case 'create-event':
      render(CreateEventPage());
      break;
    default:
      render(LoginPage());
      break;
  }
}

window.addEventListener('hashchange', handleRoute);
window.addEventListener('load', handleRoute);
