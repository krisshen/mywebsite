/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./data/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
                sans: ["Inter", "system-ui", "sans-serif"],
            },
            colors: {
                cream: "#f5f5f3",
                "deep-red": "#c0392b",
                "light-red": "#e74c3c",
            },
        },
    },
    plugins: [],
};
