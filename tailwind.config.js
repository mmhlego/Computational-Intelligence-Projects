/* eslint-disable prettier/prettier */
// import colors from 'tailwindcss/colors';

module.exports = {
	content: ['./src/renderer/**/*.{js,jsx,ts,tsx,ejs}'],
	darkMode: 'class', // or 'media' or 'class'
	theme: {
		fontFamily: {
			sans: ['Inter', 'sans-serif'],
		},
		extend: {
			colors: {
				sideBarDark: '#1922259E',
				secondaryLight: '#D4D4D8',
				primaryLight: '#FFFFFF',
				primaryDark: '#272F36',
				secondaryDark: '#76777E',
				lightBlue: '#87d7fa',
				blue: '#29A9E1',
				yellow: '#FFE342',
				red: '#FF5B5B',
				green: '#00D08D',
				orange: '#FFAA42',
			},
		},
	},
	variants: {
		extend: {},
	},
	// eslint-disable-next-line global-require
	plugins: [require('tailwind-scrollbar-hide')],
};
