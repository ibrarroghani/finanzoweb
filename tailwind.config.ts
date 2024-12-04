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
        content: 'var(--color-bg-content)',
        card: 'var(--color-bg-card)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',

        'card-dark': 'var(--color-bg-card-dark)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        'border-primary': 'var(--color-border)',
      },
      fontSize: {
        '10': '10px',
        '12': '12px',
        '15': '15px',
        '25': '25px',
      },
      borderRadius: {
        '3': '3px',
        '5': '5px',
        '10': '10px',
      },
    },
  },
  plugins: [],
};
export default config;
