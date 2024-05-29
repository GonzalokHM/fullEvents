import { register } from '../api';

export function Register() {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      const data = await register(name, email, password);

      if (data) {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        window.location.hash = '#/login';
      } else {
        alert('Error al registrar');
      }
    };
  
    return `
      <form id="register-form">
        <h2>Registrar</h2>
        <input type="text" name="name" placeholder="Name" required>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Register</button>
      </form>
      <script>
      document.getElementById('register-form').addEventListener('submit', ${handleSubmit});
    </script>
    `;
  }
  