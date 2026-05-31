import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gml: {
          bg: '#020C1B',
          card: '#071327',
          'card-hover': '#0B1E3D',
          green: '#00D26A',
          'green-dark': '#00A854',
          blue: '#1A4DFF',
          'blue-light': '#4D79FF',
          gray: '#8BA0BB',
          border: 'rgba(255,255,255,0.08)',
        },
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'],
      },
      backgroundImage: {
        'glow-green': 'radial-gradient(circle, rgba(0,210,106,0.15) 0%, transparent 70%)',
        'glow-blue': 'radial-gradient(circle, rgba(26,77,255,0.2) 0%, transparent 70%)',
      },
    },
  },
  plugins: [],
}
export default config
