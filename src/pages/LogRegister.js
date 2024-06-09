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
    localStorage.setItem("user", JSON.stringify(data.user)); // Guardar la información del usuario
    Header();
    Home();
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
    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPass.value;
    
    if (!validateEmail(email)) {
      alert('El email debe contener "@" y "."');
      return;
    }

    if (!validatePassword(password)) {
      alert('La contraseña debe tener al menos 8 caracteres, una mayúscula y un número');
      return;
    }

    submitRegister(name, email, password);
  });
};

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return passwordRegex.test(password);
};


const submitRegister = async () => {

  if (data) {
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    LoginRegister();
  } else {
    alert('Error al registrar');
  }
};
