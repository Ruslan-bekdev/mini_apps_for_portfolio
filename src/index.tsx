import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './store'
import {createGlobalStyle} from "styled-components";
import {colors} from "./styles/styles";

const GlobalStyle = createGlobalStyle`
  body {
     background-color: ${colors.mainDark};
    color: ${colors.mainLight};
  }
`;

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <Provider store={store}>
        <React.StrictMode>
            <BrowserRouter>
                <GlobalStyle/>
                <App/>
            </BrowserRouter>
        </React.StrictMode>
    </Provider>
);