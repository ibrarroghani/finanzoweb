import type { Config } from 'tailwindcss';
import tailwindScrollbar from 'tailwind-scrollbar';
import { PluginAPI } from 'tailwindcss/types/config';

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
        'primary-gradient-dark': 'var(--color-primary-gradient-dark)',
        'border-primary': 'var(--color-border)',
        'border-light': 'var(--color-border-light)',
        'success-light': 'var(--color-success-light)',
        'link-primary': 'var(--color-link-primary)',
        'link-secondary': 'var(--color-link-secondary)',
        'custom-placeholder': 'var(--color-text-muted)',
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
        '3': '0.1875rem',
        '5': '0.3125rem',
        '10': '0.625rem',
      },
    },
  },
  plugins: [
    tailwindScrollbar({ nocompatible: true }),
    function ({ addComponents }: PluginAPI) {
      addComponents({
        '.custom-placeholder .ant-select-selection-placeholder': {
          '@apply text-custom-placeholder': {},
        },
        '.custom-placeholder input::placeholder': {
          '@apply text-custom-placeholder': {},
        },
        '.custom-placeholder select::placeholder': {
          '@apply text-custom-placeholder': {}, // Apply to select placeholders
        },
        '.custom-placeholder textarea::placeholder': {
          '@apply text-custom-placeholder': {},
        },
        '.custom-placeholder .ant-picker-input input::placeholder': {
          '@apply text-custom-placeholder': {},
        },
      });
    },
  ],
};
export default config;
