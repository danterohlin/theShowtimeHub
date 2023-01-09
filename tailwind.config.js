/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {},
		maxWidth: {
			"8xl": "90rem",
		},
		fontFamily: {
			nunito: ["Nunito", "sans-serif", "arial"],
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};