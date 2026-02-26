/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#2563EB',
                    hover: '#1D4ED8',
                },
                surface: '#FFFFFF',
                border: '#E5E7EB',
                success: '#16A34A',
                warning: '#D97706',
                error: '#DC2626',
            },
            borderRadius: {
                btn: '8px',
                card: '12px',
            },
        },
    },
    plugins: [],
}
