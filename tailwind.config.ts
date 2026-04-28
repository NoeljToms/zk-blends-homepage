import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#0a0908",
          900: "#11100e",
          850: "#171612",
          800: "#1d1c18",
          700: "#26241f",
          600: "#33302a",
          500: "#4a4640",
        },
        bone: {
          50: "#f5efe6",
          100: "#ece4d6",
          200: "#dccfba",
          300: "#c9b89c",
        },
        sand: {
          400: "#b9a07a",
          500: "#a08560",
          600: "#7d6647",
        },
        brass: {
          400: "#c9a35c",
          500: "#b08842",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "monospace"],
      },
      letterSpacing: {
        tightest: "-0.04em",
      },
      boxShadow: {
        soft: "0 1px 0 0 rgba(255,255,255,0.04) inset, 0 30px 80px -30px rgba(0,0,0,0.6)",
        ring: "0 0 0 1px rgba(201, 163, 92, 0.35)",
      },
      backgroundImage: {
        "grain":
          "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        shimmer: "shimmer 2.4s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
