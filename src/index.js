import { StrictMode } from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from 'react-redux';
import store from './context/store';

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  // <StrictMode>
  <Provider store={store}>
    <ChakraProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ChakraProvider>
  </Provider>,
  // </StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
