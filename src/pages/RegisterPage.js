import { Register } from '../components/Register';

export function RegisterPage() {
  return `
    <div>
      <h1>Regístrate</h1>
      ${Register()}
      <p>¿Ya tienes una cuenta? <a href="#/login">Inicia sesión aquí</a></p>
    </div>
  `;
}