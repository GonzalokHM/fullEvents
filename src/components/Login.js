import { login } from '../api';

export function Login() {
    const handleSubmit = async (e) => {
      e.preventDefault();
      const email = e.target.email.value;
      const password = e.target.password.value;
  
      const data = await login(email, password);
  
      if (data.token) {
        localStorage.setItem('token', data.token);
        alert('Inicio de sesión exitoso.');
        window.location.hash = '#/home';
      } else {
        alert('Error al iniciar sesión');
      }
    };
  
    return `
      <form id="login-form">
        <h2>Iniciar Sesión</h2>
        <input type="email" name="email" placeholder="Email" required>
        <input type="password" name="password" placeholder="Password" required>
        <button type="submit">Login</button>
      </form>
      <script>
      document.getElementById('login-form').addEventListener('submit', ${handleSubmit});
    </script>
    `;
  }
  