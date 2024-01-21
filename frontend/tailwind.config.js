/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				pink: '#Ff6666',
				black: '#2b2a29',
				teal: '#33cccc',
				darkTeal: '#339999',
				yellow: '#Ffcc00',
				greenishYellow: '#Cccc33',
			},
		},
	},
	plugins: [],
};
