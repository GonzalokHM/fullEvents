import { Home } from '../pages/Home';
import { LoginRegister } from '../pages/LogRegister';
import { CreateEvent } from '../pages/CreateEvent';
import { Attendees } from '../pages/Attendees';

const routes = [
  { text: 'Home', func: Home },
  { text: 'Create Event', func: CreateEvent },
  { text: 'Login/Register', func: LoginRegister },
  {text: 'Attendees', func: Attendees }
];

export const Header = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";
  const nav = document.createElement("nav");

  routes.forEach(route => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = route.text;
    a.addEventListener("click", route.func);
    nav.appendChild(a);
  });

  header.appendChild(nav);
};
