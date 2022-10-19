const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		require('daisyui'),
		require('@tailwindcss/typography'),
	],

	daisyui: {
		themes: ['garden'],
	},
};

module.exports = config;
