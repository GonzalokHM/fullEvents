import { getEvents } from '../api';
import { EventDetails } from './EventDetail';
import { LoginRegister } from './LogRegister';

export const Home = async () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }

  const user = JSON.parse(localStorage.getItem('user')); // Obtener la información del usuario

  const main = document.querySelector("main");
  main.innerHTML = "";

  const welcomeMessage = document.createElement("h3");
  welcomeMessage.textContent = `Welcome ${user.name}`;
  main.appendChild(welcomeMessage);

  const events = await getEvents();
  const eventsDiv = document.createElement("div");
  eventsDiv.className = "events";

  events.forEach(event => {
    const eventDiv = document.createElement("div");
    eventDiv.className = "event";
    eventDiv.innerHTML = `
      <h3>${event.title}</h3>
      <p>${event.date}</p>
      <p>${event.location}</p>
      <p>${event.description}</p>
      <button>show more</button>
    `;
    eventDiv.querySelector('button').addEventListener('click', () => EventDetails(event._id));
    eventsDiv.appendChild(eventDiv);
  });
  main.appendChild(eventsDiv);
};
