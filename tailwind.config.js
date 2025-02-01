import typography from '@tailwindcss/typography';
import catppuccin from "@catppuccin/tailwindcss";

/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {}
	},
	safelist: [
		{
			pattern: /bg-.+/
		},
		'mocha',
		'macchiato',
		'frappe',
		'latte'
	],
	plugins: [
		typography,
		catppuccin({
			prefix: "ctp",
			defaultFlavour: "macchiato",
		}),
	]
};
