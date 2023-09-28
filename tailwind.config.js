/** @type {import('tailwindcss').Config} */
/* eslint-disable max-len */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    transparent: "transparent",
    current: "currentColor",
    extend: {
      colors: {
        border: "hsl(var(--border)/<alpha-value>)",
        input: "hsl(var(--input)/<alpha-value>)",
        ring: "hsl(var(--ring)/<alpha-value>)",
        background: "hsl(var(--background)/<alpha-value>)",
        background_muted: "hsl(var(--background_muted)/<alpha-value>)",
        foreground: "hsl(var(--foreground)/<alpha-value>)",
        primary: {
          DEFAULT: "hsl(var(--primary)/<alpha-value>)",
          foreground: "hsl(var(--primary-foreground)/<alpha-value>)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary)/<alpha-value>)",
          foreground: "hsl(var(--secondary-foreground)/<alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive)/<alpha-value>)",
          foreground: "hsl(var(--destructive-foreground)/<alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted)/<alpha-value>)",
          foreground: "hsl(var(--muted-foreground)/<alpha-value>)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent)/<alpha-value>)",
          foreground: "hsl(var(--accent-foreground)/<alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover)/<alpha-value>)",
          foreground: "hsl(var(--popover-foreground)/<alpha-value>)",
        },
        card: {
          DEFAULT: "hsl(var(--card)/<alpha-value>)",
          foreground: "hsl(var(--card-foreground)/<alpha-value>)",
        },
      }
    }
  },
  //       // light mode
  //       tremor: {
  //         brand: {
  //           faint: "#eff6ff", // blue-50
  //           muted: "#bfdbfe", // blue-200
  //           subtle: "#60a5fa", // blue-400
  //           DEFAULT: "#3b82f6", // blue-500
  //           emphasis: "#1d4ed8", // blue-700
  //           inverted: "#ffffff", // white
  //         },
  //         background: {
  //           muted: "#f9fafb", // gray-50
  //           subtle: "#f3f4f6", // gray-100
  //           DEFAULT: "#ffffff", // white
  //           emphasis: "#374151", // gray-700
  //         },
  //         border: {
  //           DEFAULT: "#e5e7eb", // gray-200
  //         },
  //         ring: {
  //           DEFAULT: "#e5e7eb", // gray-200
  //         },
  //         content: {
  //           subtle: "#9ca3af", // gray-400
  //           DEFAULT: "#6b7280", // gray-500
  //           emphasis: "#374151", // gray-700
  //           strong: "#111827", // gray-900
  //           inverted: "#ffffff", // white
  //         },
  //       },
  //       // dark mode
  //       "dark-tremor": {
  //         brand: {
  //           faint: "#0B1229", // custom
  //           muted: "#172554", // blue-950
  //           subtle: "#1e40af", // blue-800
  //           DEFAULT: "#3b82f6", // blue-500
  //           emphasis: "#60a5fa", // blue-400
  //           inverted: "#030712", // gray-950
  //         },
  //         background: {
  //           muted: "#131A2B", // custom
  //           subtle: "#1f2937", // gray-800
  //           DEFAULT: "#111827", // gray-900
  //           emphasis: "#d1d5db", // gray-300
  //         },
  //         border: {
  //           DEFAULT: "#1f2937", // gray-800
  //         },
  //         ring: {
  //           DEFAULT: "#1f2937", // gray-800
  //         },
  //         content: {
  //           subtle: "#4b5563", // gray-600
  //           DEFAULT: "#6b7280", // gray-600
  //           emphasis: "#e5e7eb", // gray-200
  //           strong: "#f9fafb", // gray-50
  //           inverted: "#000000", // black
  //         },
  //       },
  //     },
  //     boxShadow: {
  //       // light
  //       "tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  //       "tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  //       "tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  //       // dark
  //       "dark-tremor-input": "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  //       "dark-tremor-card": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  //       "dark-tremor-dropdown": "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  //     },
  //     borderRadius: {
  //       "tremor-small": "0.375rem",
  //       "tremor-default": "0.5rem",
  //       "tremor-full": "9999px",
  //     },
  //     fontSize: {
  //       "tremor-label": ["0.75rem"],
  //       "tremor-default": ["0.875rem", { lineHeight: "1.25rem" }],
  //       "tremor-title": ["1.125rem", { lineHeight: "1.75rem" }],
  //       "tremor-metric": ["1.875rem", { lineHeight: "2.25rem" }],
  //     },
  //   },
  // },
  // safelist: [
  //   {
  //     pattern:
  //       /^(bg-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //     variants: ["hover", "ui-selected"],
  //   },
  //   {
  //     pattern:
  //       /^(text-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //     variants: ["hover", "ui-selected"],
  //   },
  //   {
  //     pattern:
  //       /^(border-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //     variants: ["hover", "ui-selected"],
  //   },
  //   {
  //     pattern:
  //       /^(ring-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //   },
  //   {
  //     pattern:
  //       /^(stroke-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //   },
  //   {
  //     pattern:
  //       /^(fill-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950))$/,
  //   },
  // ],
  plugins: [require("@headlessui/tailwindcss")],
};
