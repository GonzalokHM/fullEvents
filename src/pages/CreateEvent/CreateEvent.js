import { createEventApi } from '../api';
import { LoginRegister } from '../LogRegister/LogRegister';
import { createInput, createTextarea, createForm, createSpinner, createButton } from '../../utils/funtions';
import './createEvent.css'

export const CreateEvent = () => {
  if (!localStorage.getItem('token')) {
    LoginRegister();
    return;
  }

  const main = document.querySelector('main');
  main.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'createEvent-container';

  const inputs = [
    createInput('text', 'title', 'title', 'Title'),
    createInput('datetime-local', 'date', 'date', '', true),
    createInput('text', 'location', 'location', 'Location'),
    createTextarea('description', 'Description')
  ];

  const spinner = createSpinner();
  const button = createButton('Create');

  const onSubmit = async () => {
    const title = document.getElementById('title').value;
    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const description = document.getElementById('description').value;

    const data = await createEventApi(title, date, location, description);
    if (data) {
      alert('Successfully created event');
      window.location.hash = '#/home';
    } else {
      alert('Error creating event');
    }
  };

  const form = createForm(inputs, button, spinner, onSubmit);
  container.appendChild(form);
  main.appendChild(container);
};
