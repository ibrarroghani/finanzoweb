import type { Config } from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        md: '796px',
      },
      colors: {
        content: 'var(--color-bg-content)',
        card: 'var(--color-bg-card)',
        danger: 'var(--color-danger)',
        warning: 'var(--color-warning)',
        success: 'var(--color-success)',
        muted: 'var(--color-text-muted)',

        'card-dark': 'var(--color-bg-card-dark)',
        'primary-dark': 'var(--color-primary-dark)',
        'primary-light': 'var(--color-primary-light)',
        'border-primary': 'var(--color-border)',
        'success-light': 'var(--color-success-light)',
      },
      fontSize: {
        '10': '0.625rem',
        '12': '0.75rem',
        '15': '0.9375rem',
        '18': '1.125rem',
        '25': '1.5625rem',
        '28': '1.75rem',
        '32': '2rem',
      },
      borderRadius: {
        '3': '3px',
        '5': '5px',
        '10': '10px',
      },
    },
  },
  plugins: [tailwindScrollbar({ nocompatible: true })],
};
export default config;
