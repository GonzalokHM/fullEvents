export const Footer = () => {
    const footer = document.querySelector('footer');
    footer.innerHTML = `
      <p>&copy; ${new Date().getFullYear()} Event Management. All rights reserved.</p>
    `;
  };