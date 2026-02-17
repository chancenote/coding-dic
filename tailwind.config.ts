import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "var(--surface)",
          secondary: "var(--surface-secondary)",
          elevated: "var(--surface-elevated)",
        },
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          tertiary: "var(--text-tertiary)",
        },
        border: {
          DEFAULT: "var(--border)",
          strong: "var(--border-strong)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          soft: "var(--accent-soft)",
          hover: "var(--accent-hover)",
        },
        tag: {
          blue: "var(--tag-blue)",
          "blue-bg": "var(--tag-blue-bg)",
          green: "var(--tag-green)",
          "green-bg": "var(--tag-green-bg)",
          purple: "var(--tag-purple)",
          "purple-bg": "var(--tag-purple-bg)",
          orange: "var(--tag-orange)",
          "orange-bg": "var(--tag-orange-bg)",
        },
      },
      fontFamily: {
        sans: ['"Pretendard Variable"', "Pretendard", "-apple-system", "BlinkMacSystemFont", "system-ui", "Roboto", "sans-serif"],
        mono: ['"JetBrains Mono"', '"Fira Code"', "Menlo", "Consolas", "monospace"],
      },
      fontSize: {
        "display": ["2.25rem", { lineHeight: "1.2", fontWeight: "800" }],
        "heading": ["1.5rem", { lineHeight: "1.3", fontWeight: "700" }],
        "subheading": ["1.125rem", { lineHeight: "1.4", fontWeight: "600" }],
        "body": ["1rem", { lineHeight: "1.6", fontWeight: "400" }],
        "caption": ["0.875rem", { lineHeight: "1.5", fontWeight: "400" }],
        "micro": ["0.75rem", { lineHeight: "1.4", fontWeight: "500" }],
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.25rem",
        "4xl": "1.5rem",
      },
      boxShadow: {
        "card": "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 25px rgba(0,0,0,0.08), 0 4px 10px rgba(0,0,0,0.04)",
        "elevated": "0 20px 40px rgba(0,0,0,0.1), 0 8px 16px rgba(0,0,0,0.06)",
        "glow": "0 0 20px var(--accent-soft)",
      },
      animation: {
        "fade-in": "fadeIn 0.35s ease-out both",
        "slide-up": "slideUp 0.4s ease-out both",
        "scale-in": "scaleIn 0.2s ease-out both",
        "shimmer": "shimmer 1.8s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(6px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
