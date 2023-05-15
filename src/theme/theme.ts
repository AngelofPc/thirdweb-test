// theme.ts

// 1. import `extendTheme` function
import {
  extendTheme
  // StyleFunctionProps
  // type ThemeConfig
} from '@chakra-ui/react';
import { StepsTheme as Steps } from 'chakra-ui-steps';

export const gradients = {
  100: '#767676',
  // 200: 'green',
  // 300: '#444444',
  // 400: '#222222',
  // 500: '#E6EAEE',
  // 600: '#Ededed',
  // 700: '#1a202c',
  primary: 'linear-gradient(89.25deg, #004F4D -23.75%, #6BB07A 97.59%)'
};

const theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false
  },
  fonts: {
    body: `'Inter', sans-serif`,
    heading: `'Inter', sans-serif`
    // heading: `'PowerGrotesk-Regular', sans-serif`,
    // power: `'PowerGrotesk-Regular', sans-serif`,
    // body: `'LabilGrotesk-Regular', sans-serif`
  },
  components: {
    Steps,
    Box: {
      variants: {
        'with-shadow': {
          bg: 'red.400',
          color: 'yellow.400',
          boxShadow: '0 0 2px 2px #efdfde'
        }
      }
    },
    Container: {
      variants: {
        'body-md': {
          bg: 'dark.900',
          minH: '100vh',
          maxW: '100vw',
          p: 0,
          '&> :not(:first-of-type)': {
            px: 10
          }
        },
        'body-base': {
          bg: 'dark.900',
          minH: '100vh',
          maxW: '100vw',
          p: 0,
          '&> :not(:first-of-type)': {
            px: 6
          }
        }
      }
    },
    Button: {
      baseStyle: {
        py: 4,
        rounded: 10
      },
      variants: {
        primary: {
          bg: 'primary.400'
        }
      }
    }
  },

  colors: {
    light: {
      400: '#fff',
      500: '#F5F5F5'
    },
    dark: {
      400: '#111111',
      500: '#222222',
      900: '#111111'
    },
    primary: {
      100: '#FAEDD4',
      200: '#FFF6F2',
      300: '#FFF7F2',
      400: '#FF5500',
      500: '#B83D00',
      600: '#FFD499'
    },
    secondary: {
      400: '#6BB07A',
      300: '#FAEDD4;'
    },
    grey: {
      100: '#767676',
      200: '#555555',
      300: '#444444',
      400: '#222222',
      500: '#333333',
      600: '#D6D6D6',
      700: '#1a202c'
    },
    yellow: {
      40: '#FEFAF3'
    },
    blue: {
      50: '#d7e8f7',
      100: '#97BAFF'
    }
  }
});

// 3. extend the theme
export default theme;
