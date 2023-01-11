/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				slate: {
					150: "#1c283c52",
					250: "#1e59855c",
				},
			},
			animation: {
				swave: "swave 100s linear infinite",
			},
			keyframes: {
				swave: {
					"0%": { transform: "translateY(110px)   translateX(400px) rotate(0deg)" },
					"25%": {
						transform: "translateY(120px)  translateX(500px) rotate(90deg)",
					},
					"50%": {
						transform: "translateY(130px)  translateX(600px) rotate(180deg)",
					},
					"100%": {
						transform: "translateY(120px)  translateX(500px) rotate(360deg)",
					},
				},
			},
		},
		maxWidth: {
			"8xl": "90rem",
		},
		fontFamily: {
			nunito: ["Nunito", "sans-serif", "arial"],
			poppins: ["Poppints", "sans-serif", "arial"],
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
