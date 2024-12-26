export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      white: '#fff',
      green: '#689675',
      'green-dark': '#557C60',
      gold: '#BBAB70',
      yellow: '#fcce2c',
      black: '#141414',
      'black-300': '#1F1F1F',
      'black-400': '#333333',
      'neutral-500': '#7C8388',
      'neutral-400': '#ABB3B7',
      'neutral-300': '#CFD7DB',
      'neutral-200': '#EEF0F0',
      'neutral-100': '#F8F8F8',
      'success-main': '#7ACAA4',
      'success-secondary': '#DDE8DA',
      'error-main': '#E13737',
      'error-secondary': '#FFC2C2',
    },
    fontFamily: {
      inter: ['Ubuntu'],
    },
    fontSize: {
      headline: [
        '24px',
        {
          lineHeight: '32px',
          fontWeight: '700',
        },
      ],
      'body-xl-regular': [
        '24px',
        {
          lineHeight: '28px',
          fontWeight: '400',
        },
      ],
      'body-xl-medium': [
        '24px',
        {
          lineHeight: '28px',
          fontWeight: '500',
        },
      ],
      'body-xl-bold': [
        '24px',
        {
          lineHeight: '28px',
          fontWeight: '700',
        },
      ],
      'body-l-regular': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '400',
        },
      ],
      'body-l-medium': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '500',
        },
      ],
      'body-l-bold': [
        '18px',
        {
          lineHeight: '28px',
          fontWeight: '700',
        },
      ],
      'body-m-regular': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '400',
        },
      ],
      'body-m-medium': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '500',
        },
      ],
      'body-m-bold': [
        '16px',
        {
          lineHeight: '24px',
          fontWeight: '700',
        },
      ],
      'body-s-regular': [
        '14px',
        {
          lineHeight: '18px',
          fontWeight: '400',
        },
      ],
      'body-s-medium': [
        '14px',
        {
          lineHeight: '18px',
          fontWeight: '500',
        },
      ],
      'body-s-bold': [
        '14px',
        {
          lineHeight: '18px',
          fontWeight: '700',
        },
      ],
      button: [
        '17px',
        {
          lineHeight: '24px',
          fontWeight: '500',
        },
      ],
    },
    spacing: {
      0: '0',
      1: '4px',
      2: '8px',
      2.5: '10px',
      3: '12px',
      4: '16px',
      5: '20px',
      6: '24px',
      7: '28px',
      8: '32px',
      9: '36px',
      10: '40px',
      11: '44px',
      12: '48px',
      13: '52px',
      14: '56px',
      15: '60px',
      16: '64px',
      17: '68px',
      18: '72px',
      19: '76px',
      20: '80px',
      21: '84px',
    },
    extend: {
      boxShadow: {
        base: '0px 2px 16px 0px rgba(0, 0, 0, 0.12)',
      },
    },
    plugins: [],
  },
};
