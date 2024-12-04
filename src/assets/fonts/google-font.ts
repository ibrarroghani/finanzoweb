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
      style: 'black',
    },
    {
      path: './ProductSans-Bold.ttf',
      weight: '700',
      style: 'bold',
    },
    {
      path: './ProductSans-Regular.ttf',
      weight: '400',
      style: 'regular',
    },
    {
      path: './ProductSans-Medium.ttf',
      weight: '500',
      style: 'medium',
    },
    {
      path: './ProductSans-Thin.ttf',
      weight: '100',
      style: 'thin',
    },
    {
      path: './ProductSans-Light.ttf',
      weight: '300',
      style: 'light',
    },
  ],
  fallback: ['Arial', 'sans-serif'],
});
