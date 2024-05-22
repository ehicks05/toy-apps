/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.tsx', './index.html'],
	theme: {
		extend: {},
		fontFamily: {
			sans: ['Lexend Deca', 'ui-sans-serif', 'system-ui'],
			serif: ['ui-serif', 'Georgia'],
			mono: ['ui-monospace', 'SFMono-Regular'],
		},
	},
	plugins: [],
};
