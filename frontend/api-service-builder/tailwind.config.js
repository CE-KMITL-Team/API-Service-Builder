/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		extend: {
			colors: {
				primary: {
					700: "#3DBCC7",
					800: "#429EA6",
					900: "#2EA6B0",
				},
				dark: {
					DEFAULT: "#0C0C0C",
					900: "#0C0C0C",
					800: "#191919",
					700: "#242323",
					600: "#2B2929",
				},
				grey: "#E8E8E8",
				white: "#FFFFFF",
				danger: "#FF7A00",
				warning: "#FF0000",
			},
		},
	},
	plugins: [],
};
