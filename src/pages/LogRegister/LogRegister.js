import { Home } from '../Home/Home';
import { Header } from '../../components/Header/Header';
import { registerApi, loginApi } from '../../api';
import { createButton , createInput, createSpinner , createForm, validateEmail, validatePassword } from '../../utils/funtions';
import './LogRegister.css'

export const LoginRegister = (showLogin = true) => {
  const main = document.querySelector("main");
  main.innerHTML = "";

  const container = document.createElement("div");
  container.className = "auth-container";
  
  
  const loginDiv = document.createElement("div");
  loginDiv.id = "login";
  if (showLogin) Login(loginDiv);
  
  const registerDiv = document.createElement("div");
  registerDiv.id = "register";
  if (!showLogin) Register(registerDiv);
  
  container.append(loginDiv, registerDiv);
  const toggleButton = createButton( showLogin ? "Register" : "Login", () => {
    LoginRegister(!showLogin);
  });

  container.appendChild(toggleButton);
  main.appendChild(container)
};

const Login = (elementoPadre) => {

  const inputUN = createInput("email", "login-email", "email", "Email");
  const inputPass = createInput("password", "login-password", "password", "*****");
  const button = createButton("Login");
  const spinner = createSpinner();

  const form = createForm(
    [inputUN, inputPass],
    button,
    spinner,
    () => submitLogin(inputUN.value, inputPass.value)
  );

  elementoPadre.append(form);
};

const Register = (elementoPadre) => {
  const inputName = createInput("text", "register-name", "name", "Name");
  const inputEmail = createInput("email", "register-email", "email", "Email");
  const inputPass = createInput("password", "register-password", "password", "*****");
  const button = createButton("Register");
  const spinner = createSpinner();

  const form = createForm(
    [inputName, inputEmail, inputPass],
    button,
    spinner,
    () => {
      const name = inputName.value;
      const email = inputEmail.value;
      const password = inputPass.value;

      if (!validateEmail(email)) {
        alert('The email must contain: "@" y "."');
        return Promise.resolve();
      }

      if (!validatePassword(password)) {
        alert('The password must be at least 8 characters long, an uppercase and a number');
        return Promise.resolve();
      }

      return submitRegister(name, email, password);
    }
  );

  elementoPadre.append(form);
};

const submitLogin = async (email, password) => {
  const data = await loginApi(email, password);
  if (data && data.token) {
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));
    Header();
    Home();
  } else {
    alert('Failed to login' + (data.error || 'Unknown error'));
  }
};

const submitRegister = async (name, email, password) => {
  const data = await registerApi(name, email, password);
  if (data && !data.error) {
    await submitLogin(email, password);
  } else {
    alert('Error al registrar' + (data.error || 'Unknown error'));
  }
};
