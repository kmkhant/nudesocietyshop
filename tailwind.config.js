/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./pages/**/*.{js,ts,jsx,tsx}",
		"./components/**/*.{js,ts,jsx,tsx}",
	],
	theme: {
		extend: {
			colors: {
				mainColor: "#00FF03",
				grayColor: "#5B5B5B",
			},
			fontFamily: {
				russo: ["Russo One", "sans-serif"],
			},
			height: {
				bs: "400px",
			},
			width: {
				bs: "400px",
			},
		},
	},
	plugins: [require("@tailwindcss/forms")],
};
