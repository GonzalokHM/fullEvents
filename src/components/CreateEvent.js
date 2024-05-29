import { createEventApi } from '../api';

export function CreateEvent() {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const title = e.target.title.value;
      const date = e.target.date.value;
      const location = e.target.location.value;
      const description = e.target.description.value;
  
      
    const data = await createEventApi(title, date, location, description);

    if (data) {
      window.location.hash = '#/home';
      } else {
        alert('Error al crear evento');
      }
    };
  
    return `
      <form id="create-event-form">
        <h2>Crear Evento</h2>
        <input type="text" name="title" placeholder="Título" required>
        <input type="datetime-local" name="date" required>
        <input type="text" name="location" placeholder="Ubicación" required>
        <textarea name="description" placeholder="Descripción" required></textarea>
        <button type="submit">Crear</button>
      </form>
      <script>
      document.getElementById('create-event-form').addEventListener('submit', ${handleSubmit});
    </script>
    `;
  }
  