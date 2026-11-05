import type { Config } from 'tailwindcss'
export default { content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'], theme: { extend: { colors: { ink: '#0a0a0a', panel: '#151515', gold: '#c6a15b' }, fontFamily: { display: ['Bodoni Moda','serif'], sans: ['Plus Jakarta Sans','sans-serif'] } } }, plugins: [] } satisfies Config
