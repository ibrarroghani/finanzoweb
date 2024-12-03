import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        contentBackground: 'var(--contentBackground)',
        primaryDarkAccent: 'var(--primaryDarkAccent)',
        cardBackground: 'var(--cardBackground)',
        successAccent: 'var(--successAccent)',
        borderAccent: 'var(--borderAccent)',
        dangerAccent: 'var(--dangerAccent)',
      },
    },
  },
  plugins: [],
};
export default config;
