import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter} from "react-router-dom";
import Links from './Routes/Links'

/* 01 INICIA APP REDIRECCIONANDO AL LOGIN */
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Links />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
