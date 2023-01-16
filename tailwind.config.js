/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
const { rootCertificates } = require("tls");
module.exports = {
	content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				slate: {
					150: "#1c283c52",
					250: "#1e59855c",
				},
				zinc: {
					1000: "rgb(16 16 18)",
				},
			},
			maxWidth: {
				"8xl": "90rem",
			},
			animation: {
				swave: "swave 30s linear infinite",
			},
			keyframes: {
				swave: {
					"0%": {
						opacity: 0,
						right: "20%",
						top: "5%",
						transform: "rotate(0deg)",
					},
					"10%": {
						opacity: 0.5,
						right: "55%",
						top: "20%",
					},
					"20%": {
						opacity: 0,
						right: "20%",
						top: "30%",
						transform: "rotate(360deg)",
					},
					"30%": {
						opacity: 0.9,
						right: "55%",
						top: "10%",
					},
					"40%": {
						opacity: 0.1,
						right: "20%",
						top: "25%",
						transform: "rotate(0deg)",
					},
					"50%": {
						opacity: 0,
						right: "55%",
						top: "0%",
					},
					"60%": {
						opacity: 0.3,
						right: "20%",
						top: "15%",
						transform: "rotate(360deg)",
					},
					"70%": {
						opacity: 0,
						right: "55%",
						top: "5%",
					},
					"80%": {
						opacity: 0.9,
						right: "20%",
						top: "30%",
						transform: "rotate(0deg)",
					},
					"90%": {
						opacity: 0.3,
						right: "55%",
						top: "20%",
					},
					"100%": {
						opacity: 0,
						transform: "rotate(0deg)",
						right: "20%",
						top: "5%",
					},
				},
			},
		},
		fontFamily: {
			nunito: ["Nunito", "sans-serif", "arial"],
			poppins: ["Poppints", "sans-serif", "arial"],
		},
	},
	plugins: [require("tailwind-scrollbar")({ nocompatible: true })],
};
