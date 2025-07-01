export default {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'green-primary': 'var(--green-primary)',
        'green-secondary': 'var(--green-secondary)',
        'green-accent': 'var(--green-accent)',
        'green-light': 'var(--green-light)',
        'green-dark': 'var(--green-dark)',
      },
    },
  },
  plugins: [],
};