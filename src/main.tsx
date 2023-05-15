import '@fontsource/inter';

import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
} from '@chakra-ui/react';
import App from './App';

const { ToastContainer, toast } = createStandaloneToast();

import theme from './theme/theme';
import Fonts from './theme/font';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ChakraProvider theme={theme}>
    {/* <ThirdwebProvider
      // Required configuration for the provider, but doesn't affect Auth.
      activeChain="mumbai"
      authConfig={{
        // Set this to your domain to prevent phishing attacks
        domain: 'localhost:1337',
        // The URL of your Auth API
        authUrl: 'http://localhost:1337/api/auth'
      }}
    >
  */}
    <Provider store={store}>
      <Fonts />
      <App />
      <ToastContainer />
    </Provider>
    {/* </ThirdwebProvider> */}
  </ChakraProvider>
  // </React.StrictMode>
);

// "@types/react": "^18.0.26",
// "@types/react-dom": "^18.0.9",
// "@vitejs/plugin-react": "^4.0.0",
