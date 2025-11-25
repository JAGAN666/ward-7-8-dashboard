/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ward7: '#2563eb',
        ward8: '#7c3aed',
        dcAverage: '#94a3b8',
        supermarket: '#22c55e',
        convenience: '#f59e0b',
        lowAccess: '#ef4444',
      },
    },
  },
  plugins: [],
}
