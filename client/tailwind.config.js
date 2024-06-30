import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export const tailwindConfig = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", flowbite.content()],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
