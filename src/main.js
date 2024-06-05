import { Header } from './components/Header';
import { Home } from './pages/Home';
import { LoginRegister } from './pages/LogRegister';
import '../style.css';

const Main = () => {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <header></header>
    <main></main>

  `;

  Header();

  if (localStorage.getItem('user')) {
    Home();
  } else {
    LoginRegister();
  }
}

Main();