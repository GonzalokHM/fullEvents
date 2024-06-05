import { Home } from './Home';
import { Header } from '../components/Header';
import { registerApi, loginApi } from '../api';

export const LoginRegister = () => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const loginDiv = document.createElement("div");
  loginDiv.id = "login";
  Login(loginDiv);

  const registerDiv = document.createElement("div");
  registerDiv.id = "register";
  Register(registerDiv);

  main.append(loginDiv, registerDiv);
};

const Login = (elementoPadre) => {
  const form = document.createElement("form");

  const inputUN = document.createElement("input");
  const inputPass = document.createElement("input");
  const button = document.createElement("button");

  inputPass.type = "password";
  inputUN.placeholder = "Email";
  inputPass.placeholder = "*****";
  button.textContent = "Login";

  form.append(inputUN, inputPass, button);
  elementoPadre.append(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitLogin(inputUN.value, inputPass.value);
  });
};

const submitLogin = async (email, password) => {
  const data = await loginApi(email, password);
  if (data && data.token) {
    localStorage.setItem("token", data.token);
    Home();
    Header();
  } else {
    alert('Error al iniciar sesión');
  }
};

const Register = (elementoPadre) => {
  const form = document.createElement("form");

  const inputName = document.createElement("input");
  const inputEmail = document.createElement("input");
  const inputPass = document.createElement("input");
  const button = document.createElement("button");

  inputName.placeholder = "Name";
  inputEmail.placeholder = "Email";
  inputPass.type = "password";
  inputPass.placeholder = "*****";
  button.textContent = "Register";

  form.append(inputName, inputEmail, inputPass, button);
  elementoPadre.append(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitRegister(inputName.value, inputEmail.value, inputPass.value);
  });
};

const submitRegister = async (name, email, password) => {
  const data = await registerApi(name, email, password);
  if (data) {
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    LoginRegister();
  } else {
    alert('Error al registrar');
  }
};
