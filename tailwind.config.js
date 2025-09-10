/** @type {import('tailwindcss').Config} */
import { fontFamily } from 'tailwindcss/defaultTheme';

export const content = ['./src/**/*.{js,jsx,ts,tsx}', './index.html'];
export const theme = {
	fontFamily: {
		sans: ['Fredoka', ...fontFamily.sans],
		mono: fontFamily.mono,
		logo: '"Proza Libre"',
	},
	container: {
		center: true,
		padding: '2rem',
		screens: {
			'2xl': '1400px',
		},
	},
};
export const variants = {
	extend: {},
};