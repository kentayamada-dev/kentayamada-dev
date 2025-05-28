import { Noto_Sans_JP, Press_Start_2P, Roboto_Mono } from 'next/font/google';

const notoSansJP = Noto_Sans_JP({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-noto-sans-jp'
});

const robotoMono = Roboto_Mono({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-roboto-mono'
});

const pressStart2P = Press_Start_2P({
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-press-start-2p',
  weight: '400'
});

const fonts = `${notoSansJP.variable} ${robotoMono.variable} ${pressStart2P.variable}`;

export { fonts, notoSansJP };
