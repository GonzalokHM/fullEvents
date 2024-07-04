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
    <h2>Create Event</h2>
    <input type="text" name="title" placeholder="Title" required>
    <input type="datetime-local" name="date" required>
    <input type="text" name="location" placeholder="Location" required>
    <textarea class="description" name="description" placeholder="Description" required></textarea>
    <button type="submit">Create</button>
  `;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const date = e.target.date.value;
    const location = e.target.location.value;
    const description = e.target.description.value;

    const data = await createEventApi(title, date, location, description);
    if (data) {
      alert('Successfully created event');
      window.location.hash = '#/home';
    } else {
      alert('Error creating event');
    }
  });

  main.appendChild(form);
};
