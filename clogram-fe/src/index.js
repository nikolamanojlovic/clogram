import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import configureStore from './store';
import { Provider } from 'react-redux';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const theme = createMuiTheme({
    shadows: ['none'],
    palette: {
        primary: {
            main: '#4ca2cd',
            contrastText: '#ffffff'
        }
    },
    typography: {
        h4: {
            fontFamily: 'Pacifico, cursive',
            fontWeight: 'normal',
            marginTop: 10,
            marginBottom: 15
        }
    },
    overrides: {
        MuiButton: {
            root: {
                background: '#67b26f',
                background: 'linear-gradient(45deg, #67b26f, #4ca2cd)',
                fontWeight: 'bold'
            }
        }
    }
});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <Provider store={configureStore()}>
            <App />
        </Provider>
    </ThemeProvider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
