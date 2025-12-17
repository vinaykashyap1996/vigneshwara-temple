import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
    ],
    theme: {
        screens: {
            sm: "575px",
            md: "767px",
            lg: "991px",
            xl: "1219px",
            "2xl": "1400px",
        },
        container: {
            center: true,
            padding: {
                DEFAULT: "1rem",
                sm: "1.25rem",
                lg: "2rem",
                xl: "2.5rem",
            },
            screens: {
                xl: "1219px",
                "2xl": "1320px",
            },
        },
        extend: {
            colors: {
                primary: "#f5d061",
                secondary: "#f8f6f6",
                tertiary: "#cf4647",
                accent: "#2a363b",
                background: "#0f172a",
                foreground: "#e5e7eb",
            },
            fontFamily: {
                sans: ["Titillium Web", "system-ui", "sans-serif"],
            },
            fontSize: {
                h1: ["3.25rem", { lineHeight: "1.1", fontWeight: "700" }],
                h2: ["2.5rem", { lineHeight: "1.15", fontWeight: "600" }],
                h3: ["1.875rem", { lineHeight: "1.2", fontWeight: "600" }],
                body: ["1rem", { lineHeight: "1.6" }],
                small: ["0.875rem", { lineHeight: "1.5" }],
            },
        },
    },
    plugins: [],
};

export default config;