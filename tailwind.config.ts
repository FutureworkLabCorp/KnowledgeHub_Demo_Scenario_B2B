import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Monochrome brand tokens (v4-mono). Legacy ax-* aliases kept for code stability.
        ax: {
          blue: "#09090B",      // primary accent (dark on light bg)
          bluedeep: "#27272A",
          neon: "#3F3F46",      // muted dark accent
          violet: "#52525B",
          amber: "#52525B",
        },
        ink: {
          900: "#09090B",
          800: "#18181B",
          700: "#27272A",
          600: "#3F3F46",
          500: "#71717A",
          400: "#A1A1AA",
          300: "#D4D4D8",
          200: "#E4E4E7",
          100: "#F4F4F5",
          50: "#FAFAFA",
        },
      },
      fontFamily: {
        display: ["Outfit", "system-ui", "sans-serif"],
        body: ["Pretendard", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
