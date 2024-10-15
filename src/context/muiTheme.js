
import { createTheme } from '@mui/material/styles';

// const lightHeaderStyles = {
//     backgroundColor: '#d9e9fa', // Light mode background color
//     color: '#000000', // Light mode text color
//   };
  
//   const darkHeaderStyles = {
//     backgroundColor: '#121212', // Dark mode background color
//     color: '#ffffff', // Dark mode text color
//   };

// const lightTheme = createTheme({
//   palette: {
//     mode: 'light',
//     // Customize other palette settings for light mode here
//   },
//   headerStyles: lightHeaderStyles,

// });

// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//     // Customize other palette settings for dark mode here
//   },
//   headerStyles: darkHeaderStyles,

// });

  

// export { lightTheme, darkTheme };

const lightTheme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#007bff', // Change this to your desired primary color
    },
    secondary: {
      main: '#f64b4b', // Change this to your desired secondary color
    },
    // Add other palette options as needed
  },
});

export default lightTheme;