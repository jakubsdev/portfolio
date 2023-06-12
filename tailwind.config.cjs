/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          // "radial-gradient(600px circle at 700px -50px, rgba(91, 33, 182, 0.2), transparent)",
          "radial-gradient(var(--tw-gradient-stops))",
      },
      backgroundPosition: {
        zero: "0% 0%",
      },
      gridTemplateColumns: {
        three: "260px minmax(900px, 1fr) 260px",
      },
      fontFamily: {
        noto: ["Noto Sans", "sans-serif"],
        playfair: "'Playfair Display', serif",
        poppins: ['"Poppins"', "sans-serif"],
      },
    },
  },
  plugins: [],
};
