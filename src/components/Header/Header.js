import { Home } from '../pages/Home';
import { LoginRegister } from '../pages/LogRegister';
import { CreateEvent } from '../pages/CreateEvent';
import { Attendees } from '../pages/Attendees';
import './Header.css'

const routes = [
  { text: 'Home', func: Home },
  { text: 'Create Event', func: CreateEvent },
  {text: 'Attendees', func: Attendees }
];

export const Header = () => {
  const header = document.querySelector("header");
  header.innerHTML = "";

  const isAuthenticated = !!localStorage.getItem('token');

    // Create the hamburger icon
    const burger = document.createElement("div");
    burger.classList.add("burger");
    burger.innerHTML = `
      <div></div>
      <div></div>
      <div></div>
    `;
  const nav = document.createElement("nav");
  nav.classList.add("nav-links");

  routes
  .filter(route => isAuthenticated || route.text === 'Login/Register')
  .forEach(route => {
    const a = document.createElement("a");
    a.href = "#";
    a.textContent = route.text;
    a.addEventListener("click", () =>{
      route.func();
    });
    nav.appendChild(a);
  });

  header.appendChild(nav);


  const authLink = document.createElement("a");
  authLink.href = "#";

  if (isAuthenticated) {
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

  header.appendChild(burger);
  header.appendChild(nav);
  
  // Add toggle functionality for the burger icon
  burger.addEventListener("click", () => {
    nav.classList.toggle("nav-active");
    burger.classList.toggle("toggle");
  });
};
