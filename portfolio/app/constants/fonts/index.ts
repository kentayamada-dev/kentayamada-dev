/* eslint-disable @cspell/spellchecker */
import { Noto_Sans_JP, Roboto_Mono } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-noto-sans-jp',
  weight: ['400']
});

const robotoMono = Roboto_Mono({
  display: 'swap',
  style: ['normal'],
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  weight: ['400']
});

const fonts = `${notoSansJP.variable} ${robotoMono.variable}`;

export { fonts, notoSansJP };
