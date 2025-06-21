/** @type {import('tailwindcss').Config} */

const config = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      animation: {
        'bubble-1': 'bubble-float-1 2s ease-out infinite',
        'bubble-2': 'bubble-float-2 2.2s ease-out infinite 0.2s',
        'bubble-3': 'bubble-float-3 1.8s ease-out infinite 0.4s',
        'bubble-4': 'bubble-float-4 2.1s ease-out infinite 0.6s',
        'bubble-5': 'bubble-float-5 1.9s ease-out infinite 0.8s',
        'bubble-6': 'bubble-float-6 2.3s ease-out infinite 1s',
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};

export default config;
