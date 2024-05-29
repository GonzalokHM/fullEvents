import { EventDetails } from '../components/EventDetails';

export async function EventPage(eventId) {
  return `
    <div>
      <h1>Detalles del Evento</h1>
      ${await EventDetails(eventId)}
      <a href="#/home">Volver a la lista de eventos</a>
    </div>
  `;
}