import { Header } from './components/Header';
import { Footer } from './components/footer';
import { Home } from './pages/Home';
import { LoginRegister } from './pages/LogRegister';
import '../style.css';

const Main = () => {
  const app = document.querySelector("#app");
  app.innerHTML = `
    <header></header>
    <main></main>
    <footer></footer>

  `;

  Header();
  Footer();

  if (localStorage.getItem('user')) {
    Home();
  } else {
    LoginRegister();
  }
}

Main();