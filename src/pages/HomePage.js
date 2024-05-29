import { EventList } from '../components/EventList';

export async function HomePage() {
  return `
    <div>
      <h1>Eventos</h1>
      <a href="#/create-event">Crear Evento</a>
      ${await EventList()}
    </div>
  `;
}