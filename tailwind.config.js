/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./templates/**/*.html",
    "./public/**/*.html",
    "./content/**/*.md",
    "config.toml",
  ],
  theme: {
    fontFamily: {
      sans: [
        "'InterVariable', 'Inter', 'sans-serif'",
        {
          fontFeatureSettings: "'liga' 1, 'calt' 1",
        },
      ],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
