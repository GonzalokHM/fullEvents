import { createEventApi } from '../api';
import { LoginRegister } from './LogRegister';

export const CreateEvent = () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return
  }
  const main = document.querySelector("main");
  main.innerHTML = "";

  const form = document.createElement("form");
  form.innerHTML = `
    <h2>Crear Evento</h2>
    <input type="text" name="title" placeholder="Título" required>
    <input type="datetime-local" name="date" required>
    <input type="text" name="location" placeholder="Ubicación" required>
    <textarea class="description" name="description" placeholder="Descripción" required></textarea>
    <button type="submit">Crear</button>
  `;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const date = e.target.date.value;
    const location = e.target.location.value;
    const description = e.target.description.value;

    const data = await createEventApi(title, date, location, description);
    if (data) {
      alert('Evento creado exitosamente');
      window.location.hash = '#/home';
    } else {
      alert('Error al crear evento');
    }
  });

  main.appendChild(form);
};
