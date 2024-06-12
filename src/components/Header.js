import { Home } from '../pages/Home';
import { LoginRegister } from '../pages/LogRegister';
import { CreateEvent } from '../pages/CreateEvent';
import { Attendees } from '../pages/Attendees';

const routes = [
  { text: 'Home', func: Home },
  { text: 'Create Event', func: CreateEvent },
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
    a.addEventListener("click", () =>{
      if (!localStorage.getItem('token') && route.text !== 'Login/Register') {
        alert('Please log in to access this section.');
        return;
      }
      route.func();
    });
    nav.appendChild(a);
  });

  header.appendChild(nav);


  const authLink = document.createElement("a");
  authLink.href = "#";

  if (localStorage.getItem('token')) {
    authLink.textContent = "Logout";
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Header();
      Home();
    });
  } else {
    authLink.textContent = "Login/Register";
    authLink.addEventListener("click", (e) => {
      e.preventDefault();
      LoginRegister();
    });
  }

  nav.appendChild(authLink);

  header.appendChild(nav);
};
