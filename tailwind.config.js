/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        borderRadius: {
            base: "0.375rem",
        },
        boxShadow: {
            base: "0 8px 30px rgba(0,0,0,.12)"
        },
        extend: {},
    },
    plugins: [],
};
