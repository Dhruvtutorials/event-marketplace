/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Royal Gold Palette
        gold: {
          50: '#FDFBF7',
          100: '#FAF4E8',
          200: '#F3E5C8',
          300: '#EBD4A2',
          400: '#DFBE74',
          500: '#D4AF37', // Pure Royal Gold
          600: '#C29826',
          700: '#9E7718',
          800: '#7A5A11',
          900: '#533C0A',
        },
        // Royal Burgundy / Imperial Crimson
        royal: {
          50: '#FAF0F2',
          100: '#F5DEE3',
          200: '#ECC0C9',
          500: '#941B38',
          600: '#7E0F2B',
          700: '#670720',
          800: '#510317',
          900: '#3D000E',
        },
        // Midnight Obsidian for Dark Mode
        midnight: {
          950: '#06090F',
          900: '#0A0E17',
          850: '#101624',
          800: '#161F32',
          700: '#222E47',
        },
        // Warm Ivory & Pearl for Light Mode
        ivory: {
          50: '#FDFCF9',
          100: '#F9F7F1',
          200: '#F3EFE4',
          300: '#E9E3D3',
        },
        brand: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#f97316',
          600: '#ea580c',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
        }
      },
    },
  },
  plugins: [],
};
