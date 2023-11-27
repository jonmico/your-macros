import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  :root {
  --text: #f3f8ec;
  --background: #000000;
  --primary: #81d180;
  --secondary: #0e2519;
  --accent: #44bb7c;
}

*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Ubuntu', sans-serif;
  color: var(--text);
  background-color: var(--background);
}

button, input {
  font-family: 'Ubuntu', sans-serif;
}


`;

export default GlobalStyles;
