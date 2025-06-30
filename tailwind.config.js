/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
        'display': ['Righteous', 'cursive'],
      },
      colors: {
        // Sistema de colores BrainLab actualizado - elegante y moderno
        'brainlab': {
          'primary': '#1e40af',      // Azul profundo elegante
          'secondary': '#7c3aed',    // Morado sofisticado
          'accent': '#18E1F3',       // Cyan brillante como solicitaste
          'dark': '#0f172a',         // Azul muy oscuro para contraste
          'light': '#f8fafc',        // Blanco marfil suave
        },
        // Gradientes y brillos
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#1e40af',
          700: '#1d4ed8',
          800: '#1e3a8a',
          900: '#1e293b',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#18E1F3',
          600: '#0891b2',
          700: '#0e7490',
          800: '#155e75',
          900: '#164e63',
        }
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #1e40af 0%, #7c3aed 100%)',
        'gradient-accent': 'linear-gradient(135deg, #18E1F3 0%, #3b82f6 100%)',
        'gradient-elegant': 'linear-gradient(135deg, #0f172a 0%, #1e40af 50%, #7c3aed 100%)',
        'gradient-shine': 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      },
      boxShadow: {
        'elegant': '0 10px 25px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'silver': '0 4px 14px 0 rgba(148, 163, 184, 0.25)',
        'glow': '0 0 20px rgba(24, 225, 243, 0.3)',
        'glow-soft': '0 0 15px rgba(24, 225, 243, 0.2)',
      }
    },
  },
  plugins: [],
};