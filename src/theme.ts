export default {
  breakpoints: ['46.25em', '69.25em'],
  colors: {
    text: '#232323',
    background: '#fff',
    backgroundHeader: 'rgb(239, 242, 244)',
    bgmuted: '#b3c1ca',
    primary: '#f00',
    // modes is necessary to enable the theme colors at the <body> level
    modes: {
      dark: {
        text: '#fff',
        background: '#000',
        primary: '#0cf',
      },
    },
  },
  fonts: {
    body: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
    heading: '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Oxygen-Sans,Ubuntu,Cantarell,Helvetica Neue,sans-serif',
    monospace: 'Menlo, monospace',
  },
  fontWeights: {
    body: 400,
    heading: 700,
    bold: 700,
  },
  lineHeights: {
    body: 1.5,
    heading: 1.3,
  },
  fontSizes: [12, 14, 16, 20, 24, 32, 48, 64, 72],
  space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
  text: {
    heading: {
      fontFamily: 'heading',
      fontWeight: 'body',
      lineHeight: 'heading',
      marginTop: 0,
      marginBottom: 3,
    },
  },
  sizes: {
    container: 1400,
  },
  styles: {
    root: {
      fontFamily: 'body',
      lineHeight: 'body',
      color: 'text',
      bg: 'background',
      fontSize: [1, 2],
    },
    Container: {
      p: [3, 4],
    },
    // the keys used here reference elements in MDX
    h1: {
      variant: 'text.heading',
      fontSize: [4, 5],
    },
    h2: {
      variant: 'text.heading',
      fontSize: [3, 4],
      marginBottom: 2,
    },
    h3: {
      variant: 'text.heading',
      fontWeight: 'heading',
      marginBottom: 0,
    },
    h5: {
      variant: 'text.heading',
      fontWeight: 'heading',
      textTransform: 'uppercase',
    },
    p: {
      marginTop: 0,
      marginBottom: 3,
    },
  },
};
