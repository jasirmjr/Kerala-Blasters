/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        kbfc: {
          yellow: '#FFD100',
          blue: '#0C2340',
          dark: '#071322',
          gold: '#E5A800',
          navy: '#001736',
          lightYellow: '#FFF066',
          charcoal: '#0F172A',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Montserrat', 'Impact', 'system-ui', 'sans-serif'],
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        avenir: ['"Avenir Arabic Heavy"', '"Avenir Arabic"', '"Avenir Next"', 'Avenir', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'stadium-gradient': 'radial-gradient(ellipse at top, rgba(255, 209, 0, 0.15), transparent 70%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(7, 19, 34, 0.4) 0%, rgba(7, 19, 34, 0.95) 100%)',
      }
    },
  },
  plugins: [],
}
