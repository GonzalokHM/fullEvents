export const createButton = (textContent, onClick) => {
    const button = document.createElement("button");
    button.textContent = textContent;
    if (onClick) {
      button.addEventListener("click", onClick);
    }
    return button;
  };

  export const createInput = (type, id, name, placeholder) => {
    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = name;
    input.placeholder = placeholder;
    return input;
  };

  export const createSpinner = () => {
    const spinner = document.createElement("div");
    spinner.className = "spinner";
    spinner.style.display = "none";
    return spinner;
  };

  export const createForm = (inputs, button, spinner, onSubmit) => {
    const form = document.createElement("form");
    inputs.forEach(input => form.appendChild(input));
    form.appendChild(button);
    form.appendChild(document.createElement("p").textContent = "or");
    form.appendChild(spinner);
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      button.disabled = true;
      spinner.style.display = "block";
      onSubmit().finally(() => {
        button.disabled = false;
        spinner.style.display = "none";
      });
    });
    return form;
  };

  export const createTextarea = (name, placeholder, required = true) => {
    const textarea = document.createElement('textarea');
    textarea.name = name;
    textarea.placeholder = placeholder;
    if (required) {
      textarea.required = true;
    }
    return textarea;
  };
  

  export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  export const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };



