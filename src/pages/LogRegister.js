import { Home } from './Home';
import { Header } from '../components/Header';
import { registerApi, loginApi } from '../api';

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
  const toggleButton = document.createElement("button");
  toggleButton.textContent = showLogin ? "Register" : "Login";
  toggleButton.addEventListener("click", () => {
    LoginRegister(!showLogin);
  });

  container.appendChild(toggleButton);
  main.appendChild(container)
};

const Login = (elementoPadre) => {
  const form = document.createElement("form");

  const inputUN = document.createElement("input");
  const inputPass = document.createElement("input");
  const button = document.createElement("button");
  const or = document.createElement("p");

  inputPass.type = "password";
  inputUN.id = "login-email";
  inputUN.name = "email";
  inputPass.type = "password";
  inputPass.id = "login-password";
  inputPass.name = "password";
  inputUN.placeholder = "Email";
  inputPass.placeholder = "*****";
  button.textContent = "Login";
  or.textContent = "or";

  form.append(inputUN, inputPass, button, or);
  elementoPadre.append(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitLogin(inputUN.value, inputPass.value).finally(() => {
      button.disabled = false;
    });
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
    alert('Failed to login' + (data.error || 'Unknown error'));
  }
};

const Register = (elementoPadre) => {
  const form = document.createElement("form");

  const inputName = document.createElement("input");
  const inputEmail = document.createElement("input");
  const inputPass = document.createElement("input");
  const button = document.createElement("button");
  const or = document.createElement("p");

  inputName.placeholder = "Name";
  inputName.name = "name";
  inputName.placeholder = "Name";
  inputEmail.id = "register-email";
  inputEmail.name = "email";
  inputEmail.placeholder = "Email";
  inputPass.type = "password";
  inputPass.id = "register-password";
  inputPass.name = "password";
  inputPass.placeholder = "*****";
  button.textContent = "Register";
  or.textContent = "or";

  // loading...
  const spinner = document.createElement("div");
  spinner.className = "spinner";
  spinner.style.display = "none";


  form.append(inputName, inputEmail, inputPass, button, or, spinner);
  elementoPadre.append(form);

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    button.disabled = true;
    spinner.style.display = "block";
    const name = inputName.value;
    const email = inputEmail.value;
    const password = inputPass.value;
    
    if (!validateEmail(email)) {
      alert('The email must contain: "@" y "."');
      button.disabled = false;
      spinner.style.display = "none";
      return;
    }

    if (!validatePassword(password)) {
      alert('The password must be at least 8 characters long, an uppercase and a number');
      button.disabled = false;
      spinner.style.display = "none";
      return;
    }

    submitRegister(name, email, password).finally(() => {
      button.disabled = false;
      spinner.style.display = "none";    
    });
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


const submitRegister = async (name, email, password) => {
  const data = await registerApi(name, email, password);
  if (data && !data.error) {
    submitLogin(email, password);
  } else {
    alert('Error al registrar' + (data.error || 'Unknown error'));
  }
};
