import { Platform } from 'react-native';

const theme = {
    colors: {
      textPrimary: '#24292e',
      textSecondary: '#586069',
      primary: '#0366d6',
      textTertiary: 'white',
      menuBackground: '#24292e',
      bodyBackground: '#eeeeee',
      containerBackground: '#cccccc',
    },
    fontSizes: {
      body: 12,
      heading: 16,
      subheading: 14,
    },
    fonts: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'System',
    }),
    fontWeights: {
      normal: '400',
      bold: '700',
    },
  };
  
  export default theme;
  