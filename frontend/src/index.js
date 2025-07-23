import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Mystore from "./redux/Store";
import { Provider } from 'react-redux';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    
      <BrowserRouter>
      <GoogleOAuthProvider clientId='802075050188-q4i3l4v4msihgafb3pg9g6t70efk7q2i.apps.googleusercontent.com'>
         <Provider store={Mystore} >
        <App/>
      </Provider>
      </GoogleOAuthProvider>
      </BrowserRouter>
    
   
  </React.StrictMode>
);


reportWebVitals();
