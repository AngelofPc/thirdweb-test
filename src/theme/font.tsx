import { Global } from '@emotion/react';

const Fonts = () => (
  <Global
    styles={`
      /* latin */
    
      
@font-face {
  font-family: 'PowerGrotesk-Regular';
  src: url('./fonts/power-grotesk/PowerGrotesk-Regular.otf') format('otf'),
       url('./fonts/power-grotesk/PowerGrotesk-Regular.otf') format('woff'),
       url('./fonts/power-grotesk/PowerGrotesk-Regular.ttf') format('truetype');
       font-weight: 400;
       font-display: swap;
       font-style: normal;
}


@font-face {
  font-family: 'LabilGrotesk-Regular';
  src: url('./fonts/labil-grotesk/LabilGrotesk-Regular.otf') format('otf'),
       url('./fonts/labil-grotesk/LabilGrotesk-Regular.woff') format('woff'),
       url('./fonts/labil-grotesk/LabilGrotesk-Regular.otf') format('opentype');
       font-weight: 400;
       font-display: swap;
       font-style: normal;
}

      `}
  />
);

export default Fonts;
