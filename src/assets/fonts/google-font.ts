import { Encode_Sans_SC, Orbitron } from 'next/font/google';
import localFont from 'next/font/local';

export const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const sans_sc = Encode_Sans_SC({
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const product_sans = localFont({
  src: [
    {
      path: './ProductSans-Black.ttf',
      weight: '900',
      style: 'normal',
    },
    {
      path: './ProductSans-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './ProductSans-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './ProductSans-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './ProductSans-Thin.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: './ProductSans-Light.ttf',
      weight: '300',
      style: 'normal',
    },
  ],
  fallback: ['Arial', 'sans-serif'],
  display: 'swap',
});
