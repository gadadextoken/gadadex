/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gada: {
          deep: '#24005E',
          midnight: '#10091E',
          surface: '#171124',
          elevated: '#1F1730',
          border: '#2A2238',
          borderLight: '#3B3050',
          violet: '#8000FF',
          electric: '#A020F0',
          magenta: '#D946FF',
          muted: '#A6A0B4',
          subtle: '#6E677F',
          up: '#0ECB81',
          down: '#F6465D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      boxShadow: {
        'glow-purple': '0 0 25px -5px rgba(128, 0, 255, 0.35)',
        'glow-magenta': '0 0 25px -5px rgba(217, 70, 255, 0.35)',
        'glow-up': '0 0 20px -5px rgba(14, 203, 129, 0.3)',
        'glow-down': '0 0 20px -5px rgba(246, 70, 93, 0.3)',
      }
    },
  },
  plugins: [],
}
