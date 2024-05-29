import { Login } from '../components/Login';

export function LoginPage() {
  return `
    <div>
      <h1>Bienvenido</h1>
      ${Login()}
      <p>¿No tienes una cuenta? <a href="#/register">Regístrate aquí</a></p>
    </div>
  `;
}