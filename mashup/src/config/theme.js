import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['Source Sans Pro'].join(','),
  },
  palette: {
    primary: {
      main: '#005570',
    },
    secondary: {
      main: '#870064',
    },
    success: {
      main: '#298936',
    },
    textcolor: {
      main: '#707070',
    },
  },
});

export default theme;
