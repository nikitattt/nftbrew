module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    fontFamily: {
      sans: ['Inter', 'sans-serif']
    },
    colors: {
      transparent: 'transparent',
      background: '#F2F2F2',
      white: {
        DEFAULT: '#FFFFFF',
        dark: '#EBE8E3'
      },
      black: {
        DEFAULT: '#000000',
        text: '#221B1A'
      },
      blue: '#3757FF',
      sky: '#B1D9FE',
      red: {
        DEFAULT: '#FF1F3D',
        background: '#F4CED4'
      },
      yellow: {
        DEFAULT: '#FFC700',
        background: '#F0F3B3'
      },
      orange: '#FFA800',
      purple: '#C24CFE',
      fuchsia: '#DB00FF',
      green: {
        DEFAULT: '#1CC500',
        background: '#B2F5CB'
      },
      teal: '#00FFF0',
      grey: {
        light: '#C7C7C7',
        DEFAULT: '#7D7D7D',
        dark: '#616161'
      },
      brand: {
        twitter: '#1da1f2',
        instagram: '#e1306c',
        facebook: '#4267b2'
      }
    },
    extend: {
      keyframes: {
        'click-sm': {
          '0%, 100%': { transform: 'scale(1.0, 1.0)' },
          '50%': { transform: 'scale(0.98, 0.98)' }
        },
        click: {
          '0%, 100%': { transform: 'scale(1.0, 1.0)' },
          '50%': { transform: 'scale(0.95, 0.95)' }
        },
        'click-lg': {
          '0%, 100%': { transform: 'scale(1.0, 1.0)' },
          '50%': { transform: 'scale(0.92, 0.92)' }
        },
        'click-shake': {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      },
      animation: {
        click: 'click 200ms ease-in-out',
        'click-shake': 'click-shake 200ms ease-in-out',
        'click-lg': 'click-lg 200ms ease-in-out',
        'click-sm': 'click-sm 150ms ease-in-out'
      }
    }
  },
  plugins: []
}
