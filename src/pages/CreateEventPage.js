import { CreateEvent } from '../components/CreateEvent';

export function CreateEventPage() {
  return `
    <div>
      <h1>Crear Nuevo Evento</h1>
      ${CreateEvent()}
      <a href="#/home">Volver a la lista de eventos</a>
    </div>
  `;
}