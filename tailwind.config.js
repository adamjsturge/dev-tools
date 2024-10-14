/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {
			colors: {
			  mocha: {
				base: '#1e1e2e',
				mantle: '#181825',
				crust: '#11111b',
				text: '#cdd6f4',
				subtext0: '#bac2de',
				subtext1: '#a6adc8',
				overlay0: '#6c7086',
				overlay1: '#585b70',
				overlay2: '#45475a',
				surface0: '#313244',
				surface1: '#292c3c',
				surface2: '#24273a',
				blue: '#89b4fa',
				lavender: '#b4befe',
				sapphire: '#74c7ec',
				sky: '#89dceb',
				teal: '#94e2d5',
				green: '#a6e3a1',
				yellow: '#f9e2af',
				peach: '#fab387',
				maroon: '#eba0ac',
				red: '#f38ba8',
				mauve: '#cba6f7',
				pink: '#f5c2e7',
				flamingo: '#f2cdcd',
				rosewater: '#f5e0dc',
			  },
			},
		  },
	},

	plugins: [require('@tailwindcss/typography')]
};
