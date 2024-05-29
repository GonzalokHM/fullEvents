export async function EventList() {
    const events = await getEvents() 
    return `
      <div>
        <h2>Eventos Disponibles</h2>
        <ul>
          ${events.map(event => `
            <li>
              <h3>${event.title}</h3>
              <p>${event.date}</p>
              <p>${event.location}</p>
              <p>${event.description}</p>
              <button onclick="window.location.hash='#/event/${event._id}'">Ver Detalles</button>
            </li>
          `).join('')}
        </ul>
      </div>
    `;
  }
  